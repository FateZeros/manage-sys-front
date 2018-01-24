/**
 * 导航栏
 * @author YJF
 */
import React, { Component } from 'react'
import { Menu, Icon, Layout } from 'antd'
import { Link } from 'react-router-dom'

import menus from '../../router/menus'

const { Sider } = Layout
const { SubMenu } = Menu

console.log(menus)
class SideMenu extends Component {

	renderSubMenu = menus => {
		return menus.map(menu => {
			if (menu.children) {
				return (
					<SubMenu key={menu.key} title={menu.title}>
						{this.renderSubMenu(menu.children)}
					</SubMenu>
				)
			}
			return (
				<Menu.Item key={menu.key}>
					{ menu.path ? <Link to={menu.path}>{menu.title}</Link> : menu.title}
				</Menu.Item>
			)
		})

	}

	renderMenu() {
		return (
			<Menu
				mode="inline"
				style={{ height: '100%', borderRight: 0 }}
			>
				{this.renderSubMenu(menus)}
			</Menu>
		)
	}

	render() {
		return (
			<Sider
				width={200}
				style={{ background: '#fff' }}
			>
				{this.renderMenu()}
			</Sider>
		)
	}
}

export default SideMenu