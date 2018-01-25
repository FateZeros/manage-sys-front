/*
* sideMenus
* 一个N层嵌套的Json Array
* @path isRequired unique
*/
const menus = [
	{
		title: '机构信息',
		path: '/org',
		icon: '',
		children: [
			{
				title: '机构信息1',
				path: '/org/info1',
				icon: '',
				children: [
				 	{
				 		title: '机构信息1-1',
				 		path: '/org/info1/info-1',
				 		icon: ''
				 	}
				]
			}, {
				title: '机构信息2',
				path: '/org/info2',
				icon: ''
			}
		]
	}, 
	{
		title: '账号管理',
		path: '/account',
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