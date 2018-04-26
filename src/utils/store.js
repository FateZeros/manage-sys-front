import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()
const allSagas = []
const allReducer = []

export function initStore(initialState = {}) {
  const enhanceMiddleware = []
  if (process.env.NODE_ENV === 'development') {
    /* eslint-disable no-undef */
    if (typeof __REDUX_DEVTOOLS_EXTENSION__ === 'function') {
      enhanceMiddleware.push(__REDUX_DEVTOOLS_EXTENSION__())
    } else {
      enhanceMiddleware.push(f => f)
    }
  }
  const middleware = compose(
    applyMiddleware(sagaMiddleware, thunk),
    ...enhanceMiddleware
  )
  const reducers = combineReducers({
    ...allReducer
  })
  const store = createStore(reducers, initialState, middleware)
  allSagas.forEach(saga => {
    sagaMiddleware.run(saga)
  })
  return store
}

export function injectSaga(saga) {
  allSagas.push(saga)
}

export function injectReducer(namespace, reducer) {
  allReducer[namespace] = reducer
}
