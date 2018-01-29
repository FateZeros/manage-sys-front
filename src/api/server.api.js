import makeRequest from 'src/utils/makeRequest'

/**
 * 获取 项目中的各种类型列表
 * typeCode == 1 客户类型
 * typeCode == 7 公司类型/行业类型
 **/
export function getTypeList(typeCode) {
	return makeRequest({
		url: `/dicts/${typeCode}/childrens`
	})
}

/***** 机构信息api  start *****/
// 获取列表查询机构
export function getOrgInfoBusers(params) {
	return makeRequest({
		url: `/busers${params}`
	})
}

// 删除机构
export function deleteBuser(id) {
	return makeRequest({
		url: '/busers',
		method: 'PUT',
		data: { id } 
	})
}
/***** 机构信息api  end *****/