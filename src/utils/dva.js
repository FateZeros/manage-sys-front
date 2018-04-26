import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { take, fork, call, all, put } from 'redux-saga/effects'
import { injectSaga, injectReducer } from './store'
import callee from './call'

const error = () => Wrap => props => {
  if (props.model.get('message') === 500) {
    return <div>error</div>
  }
  return <Wrap {...props} />
}

export default function dva(model) {
  const { actions, actionTypes } = createActions(model)
  const sagaEffects = createEffects(model)
  const sagas = createSagas(model, sagaEffects)
  const reducer = createReducer(model)
  injectSaga(sagas)
  injectReducer(model.namespace, reducer)
  return Component =>
    compose(
      connect(
        state => ({
          ...model.selectors(state),
          actionTypes
        }),
        actions
      ),
      error()
    )(Component)
}

/**
 * 创建saga
 * @param {String} namespace
 * @param {Object} effects
 */
function createSagas({ namespace, effects }, sagaEffects) {
  const sagas = []
  Object.values(effects).forEach(effect => {
    // 内部调用saga函数不会出现在组件props中
    if (effect.name[0] !== '_') {
      sagas.push(
        fork(function*() {
          while (true) {
            const actionName = `${namespace}/${effect.name}`
            const {
              payload: [...rest]
            } = yield take(actionName)
            try {
              yield call(effect, rest, sagaEffects, actionName)
            } catch (error) {
              yield put({ type: 'engine/error' })
              console.error(error)
              // @TODO：渲染错误页面
              // 参考 https://preview.pro.ant.design/#/exception/403
            }
            if (!window.HKKJ.isLoaded) {
              window.HKKJ.isLoaded = true
              const loadingEl = document.querySelector('.initial-loading')
              if (loadingEl) {
                setTimeout(() => {
                  loadingEl.classList.add('initial-loading-hide')
                  loadingEl.addEventListener('transitionend', () => {
                    loadingEl.remove()
                  })
                }, 500)
              }
            }
          }
        })
      )
    }
  })
  const rootSaga = function*() {
    yield all(sagas)
  }
  Object.defineProperty(rootSaga, 'name', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: `${namespace}Saga`
  })
  return rootSaga
}

/**
 * 创建action
 * @param {String} namespace
 * @param {Object} effects
 * @return {Function} actions
 */
function createActions({ namespace, effects }) {
  const actionFunction = {}
  const actionTypes = {}
  Object.values(effects).forEach(effect => {
    // 内部调用saga函数不会出现在组件props中
    if (effect.name[0] !== '_') {
      const actionType = `${namespace}/${effect.name}`
      actionFunction[effect.name] = (...rest) => ({
        type: actionType,
        payload: [...rest]
      })
      actionTypes[effect.name] = actionType
    }
  })
  const actions = dispatch => bindActionCreators(actionFunction, dispatch)
  return { actions, actionTypes }
}

function createReducer({ namespace, reducer }) {
  Object.keys(reducer.method).forEach(item => {
    reducer.method[`${namespace}/${item}`] = reducer.method[item]
    delete reducer.method[item]
  })
  const finallyReducer = (initialState = reducer.state, action) => {
    const reduceFn = reducer.method[action.type]
    if (!reduceFn) {
      return initialState
    }
    return reduceFn(initialState, action)
  }
  return finallyReducer
}

function createEffects(model) {
  const sagaEffects = {
    *put(action) {
      action.type = `${model.namespace}/${action.type}`
      yield put(action)
    },
    *call(...rest) {
      // 判断是否内部调用的saga
      if (typeof rest[0] === 'string') {
        yield call(model.effects[rest[0]], ...rest.slice(1), sagaEffects)
      } else {
        yield callee(...rest)
      }
    }
  }
  return sagaEffects
}
