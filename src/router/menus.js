/*
* sideMenus
* 一个N层嵌套的Json Array
* @path isRequired unique
*/
const menus = [
	{
		title: '首页',
		path: '/home',
		icon: ''
	},
	{
		title: 'UI',
		path: '/ui',
		icon: '',
		children: [
			{
				title: '按钮',
				path: '/ui/button',
				icon: '',
			},
			{
				title: '富文本',
				path: '/ui/rich-edit',
				icon: ''
			}
		]
	},
	{
		title: '表单',
		path: '/form',
		icon: ''
	},
	{
		title: '表格',
		path: '/table',
		icon: ''
	},
	{
		title: '图表',
		path: '/charts'
	},
	{
		title: '页面',
		path: '/page',
		icon: ''
	}
]

function mapToBreadcrumb(menus) {
  let ret = {}
  menus.forEach(item => {
    if (item.children) {
      ret = {
        [item.path]: item.title,
        ...ret,
        ...mapToBreadcrumb(item.children),
      }
    } else {
      ret[item.path] = item.title
    }
  })
  return ret
}

const breadcrumbMap = mapToBreadcrumb(menus)

export { breadcrumbMap }

export default menus