import { combineReducers } from 'redux'

function todo(state = []) {
	return state
}

const rootReducer = combineReducers({
	todo
})

export default rootReducer