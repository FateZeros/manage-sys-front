import { injectReducer } from 'src/utils/store'
import { fromJS } from 'immutable'
// import * as actions from './actions'

injectReducer({
	namespace: 'form',

	initialState: {
		userInfo: {
			userName: '',
			userCode: ''
		}
	},
	
	actionHandlers: {
	}
})
