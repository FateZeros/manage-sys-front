/**
 * 导航栏
 * @author YJF
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu, Layout } from 'antd'
import { Link } from 'react-router-dom'

import menus from '../../router/menus'

const { Sider } = Layout
const { SubMenu } = Menu

class SideMenu extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired
	}

	static contextTypes = {
    router: PropTypes.object.isRequired,
  }

	constructor(props, context) {
		super(props, context)
		// 经过处理的Menus
		const handledMenuData = this.handleMenusData(menus)
		this.state = {
			handledMenuData,
			selectedKeys: '',
			openKey: []
		}
	}

	componentDidMount() {
		const { pathname } = this.props.location
		this.updateActiveSideMenu(pathname)

    // 监听浏览器前进&后退事件
    // 根据对应路由地址，激活对应的按钮和菜单
    this.context.router.history.listen(next => {
      const { pathname } = next
      console.log(pathname)
      if (pathname !== '/') {
      	this.updateActiveSideMenu(pathname)
      }
    })
  }

  /*
  * 激活选中的SideMenu
  */
  updateActiveSideMenu = pathname => {
  	const openKey = this.getOpenKeys(pathname)
  	this.setState({
			openKey,
			selectedKeys: pathname
		})
  }

	/*
	* 查找openKeys
	* 即 当前key 的 所有父级 key 集合
	* 没有父级 则 []
	*/
	getOpenKeys = key => {
		let openKeys = []
		this.state.handledMenuData.forEach(newMenu => {
			if (newMenu.path === key) {
				openKeys = newMenu.parentKeys ? newMenu.parentKeys : []
			}
		})
		return openKeys
	}

	/**
	*  梳理Menu的数据结构
	*  将N层嵌套改造成深度为1的Array，添加parentKeys: Array字段
	**/
	handleMenusData = menus => {
		let newMenus = menus.concat([])
		let len = newMenus.length
		const parentKeys = []
		for (let i = 0; i < len; i ++) {
			const menu = newMenus[i]
			if (menu.children && menu.children.length !== 0) {
				const childMenu = menu.children
				for (let j = 0; j < childMenu.length; j ++) {
					if (menu.parentKeys) {
						childMenu[j].parentKeys = menu.parentKeys.concat([menu.key])
					} else {
						childMenu[j].parentKeys = [menu.key]
					}
					newMenus[len + j] = childMenu[j]
				}
				len = newMenus.length
			}
		}
		return newMenus
	}

  handleMenuChange = menu => {
  	const { key } = menu
  	this.setState({
  		selectedKeys: key
  	})
  }

  hanleMenuOpen = openKey => {
  	this.setState({
  		openKey
  	})
  }

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
				<Menu.Item key={menu.path || menu.key}>
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
				openKeys={this.state.openKey}
				selectedKeys={[this.state.selectedKeys]}
				onClick={this.handleMenuChange}
				onOpenChange={this.hanleMenuOpen}
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