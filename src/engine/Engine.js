import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { Layout, LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN';

import Header from 'src/components/header'
import SideMenu from 'src/components/side-menu'
import BreadCrumb from 'src/components/bread-crumb'

import router from 'src/router'
// modules
import DashBoard from 'src/modules/dash-board'
import Form from 'src/modules/form'
import Table from 'src/modules/table'

import styles from './Engine.less'
import './reducer'

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
			<LocaleProvider locale={zhCN}>
				<Layout>
					<Header />
					<Layout>
						<SideMenu location={this.props.location} />
						<Layout className={styles.wrap}>
							<BreadCrumb pathname={this.props.location.pathname} />
							<Content className={styles.content}>
								<Switch>
									<Route path={router.HOME} component={DashBoard} />
									<Route path={router.FORM} component={Form} />
									<Route path={router.TABLE} component={Table} />
								</Switch>
							</Content>
						</Layout>
					</Layout>
				</Layout>
			</LocaleProvider>
		)
	}
}

export default Engine