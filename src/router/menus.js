const menus = [
	{
		title: '机构信息',
		key: 'org.1',
		icon: '',
		children: [
			{
				title: '机构信息1',
				key: 'org.1.1',
				children: [
				 	{
				 		title: '机构信息1-1',
				 		key: 'org.1.1.1',
				 		path: '/app/org/org1'
				 	}
				]
			}, {
				title: '机构信息2',
				key: 'org.1.2',
				path: '/app/org'
			}
		]
	}, 
	{
		title: '账号管理',
		key: 'account.1',
		path: '/app/account',
		icon: ''
	}
]

export default menus