import React, { Component } from 'react'
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
	render() {
		return (
			<Layout>
				<Header />
				<Layout>
					<SideMenu />
					<Layout className={styles.wrap}>
						<BreadCrumb />
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