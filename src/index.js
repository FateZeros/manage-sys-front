import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import 'antd/dist/antd.css'

import Engine from './engine'
import router from './router'

import './index.less';
import registerServiceWorker from './registerServiceWorker'

import { store } from './utils/store'

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				<Route path={router.INDEX} component={Engine} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById('root')
)

registerServiceWorker();
