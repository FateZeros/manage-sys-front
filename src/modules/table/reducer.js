import { injectReducer } from 'src/utils/store'
import { fromJS } from 'immutable'
// import * as actions from './actions'

injectReducer({
	namespace: 'table',

	initialState: {
		userInfo: {
			userName: '',
			userCode: ''
		}
	},
	
	actionHandlers: {
	}
})
