import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import Header from '../components/header'
import SideMenu from '../components/side-menu'
import BreadCrumb from '../components/bread-crumb'

import router from '../router'
// modules
import Org from '../modules/org'
import Account from '../modules/account'

import styles from './Engine.less'
const { Content } = Layout

class Engine extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired
	}

	static contextTypes = {
    router: PropTypes.object.isRequired,
  }

	render() {
		return (
			<Layout>
				<Header />
				<Layout>
					<SideMenu location={this.props.location} />
					<Layout className={styles.wrap}>
						<BreadCrumb pathname={this.props.location.pathname} />
						<Content className={styles.content}>
		          <Switch>
		          	<Route path={router.ORG} component={Org}></Route>
		          	<Route path={router.ACCOUNT} component={Account}></Route>
		          </Switch>
		        </Content>
	        </Layout>
				</Layout>
			</Layout>
		)
	}
}

export default Engine