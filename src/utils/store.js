import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from 'src/engine/reducers'
import { rootSaga } from 'src/engine/sagas'

// 创建 saga 中间件
const sagaMiddleware = createSagaMiddleware()
// 动态Reducer
const dynamicReducer = {}

// 创建 root Reducer
function createReducer(reducers) {
	return combineReducers({
		...reducers
	})
}

// 挂载 saga 中间件到 store
export const store = createStore(
	rootReducer,
	applyMiddleware(sagaMiddleware)
)

// 运行 saga
sagaMiddleware.run(rootSaga)
