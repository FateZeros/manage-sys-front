function path2array(pathname) {
  return pathname.split('/').slice(1)
}

/**
 * 根据deep返回是否相等
 * @param  {Array} path1
 * @param  {Array} path2
 * @param  {Number} deep
 * @return {Boolean}
 */
function equalsPath(path1, path2, deep) {
  let matches = 0
  path1.some((item, index) => {
    if (item === path2[index]) {
      matches += 1
      return false
    }
    return true
  })
  // 根据路由定义规则，匹配4个以上返回true
  return matches >= deep
}

/**
 * 递归查找openKeys 和 selectedKeys
 * @param  {Array} menus
 * @param  {String} pathname
 * @return {Object}
 */
function walkMenuByPath(menus, pathname, deep) {
  let ret
  menus.some(item => {
    if (ret) {
      return true
    }
    // 没有二级以上的菜单
    if (item.path) {
      if (equalsPath(path2array(item.path), pathname, deep)) {
        ret = {
          openKeys: [],
          selectedKeys: [item.key]
        }
      }
    } else if (item.children) {
      ret = walkMenuByPath(item.children, pathname, deep + 1)
      if (ret) {
        ret.openKeys = [...ret.openKeys, item.key]
      }
    }
    return false
  })
  return ret
}

/**
 * 解析路由json
 * @param  {String} pathname
 * @return {Object}
 */
export default function parsePath(pathname, routes) {
  const ret = {
    openKeys: [],
    selectedKeys: []
  }
  const arrayPathname = path2array(pathname)
  // 查找openKeys 和 selectedKeys
  const mergeRet = walkMenuByPath(routes, arrayPathname, 1) || {}
  return {
    ...ret,
    ...mergeRet
  }
}
