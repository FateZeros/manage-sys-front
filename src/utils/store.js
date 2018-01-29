import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import Immutable from 'immutable'

// 创建 saga 中间件
const sagaMiddleware = createSagaMiddleware()
// 动态Reducer
const asyncReducers = {}
let store = null

// 创建 root Reducer
function createReducer(reducers) {
	return combineReducers({
		...reducers
	})
}

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
  const middleware = compose(applyMiddleware(sagaMiddleware, thunk), ...enhanceMiddleware)
  const reducers = createReducer(asyncReducers)
  store = createStore(reducers, initialState, middleware)
  // store.runSaga = runSaga
  return store
}

function injectAsyncReducer(name, reducer) {
	if (asyncReducers[name]) {
    return
  }
  asyncReducers[name] = reducer
  if (store) {
    store.replaceReducer(createReducer(reducer))
  }
}

/*
* 动态创建 Reducer
*/
export function injectReducer({ namespace, initialState, actionHandlers }) {
	console.log(namespace, initialState, actionHandlers)
	const finallyState = Immutable.fromJS(initialState)
	const finallyReducer = (state = finallyState, action) => {
    if (action.type === `${namespace}/RESET`) {
      // 重置redux
      return finallyState
    }
    const reduceFn = actionHandlers[action.type]
    if (!reduceFn) {
      return state
    }
    return reduceFn(state, action)
  }
  injectAsyncReducer(namespace, finallyReducer)
}


// 挂载 saga 中间件到 store
// export const store = createStore(
// 	rootReducer,
// 	// applyMiddleware(sagaMiddleware)
// )

// 运行 saga
// sagaMiddleware.run(rootSaga)
