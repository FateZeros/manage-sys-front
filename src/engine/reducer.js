import { injectReducer } from 'src/utils/store'
import { fromJS } from 'immutable'
import * as actions from './actions'

injectReducer({
	namespace: 'engine',
	initialState: {
		userInfo: {
			userName: '',
			userCode: ''
		}
	},
	actionHandlers: {
		[actions.SET_USER]: (state, { userInfo }) => state.setUser('userInfo', fromJS(userInfo))
	}
})