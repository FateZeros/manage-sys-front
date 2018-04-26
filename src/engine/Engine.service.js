import dva from 'src/utils/dva'
import { createStructuredSelector } from 'reselect'
import Immutable from 'immutable'
import routes from 'src/router/config'
import parsePath from 'src/router/utils'

export const actions = {
  setLoading(name) {
    return {
      type: 'engine/setLoading',
      payload: [name]
    }
  },
  deleteLoading(name) {
    return {
      type: 'engine/deleteLoading',
      payload: [name]
    }
  }
}

export default dva({
  namespace: 'engine',
  selectors: createStructuredSelector({
    model: state => state.engine,
    sideMenu: state => state.engine.get('sideMenu').toJS()
  }),
  reducer: {
    state: Immutable.fromJS({
      message: '',
      loading: [],
      sideMenu: {
        openKeys: [],
        selectedKeys: []
      }
    }),
    method: {
      error(state) {
        return state.set('message', 500)
      },
      setSideMenu(state, { sideMenu }) {
        if (sideMenu.selectedKeys) {
          const oldOpenKeys = state.getIn(['sideMenu', 'openKeys'])
          sideMenu.openKeys = Immutable.Set([
            ...oldOpenKeys,
            ...sideMenu.openKeys
          ]).toJS()
        }
        return state.mergeDeep({ sideMenu: Immutable.Map(sideMenu) })
      },
      setLoading(state, { payload }) {
        const [actionName] = payload
        if (!actionName) {
          return state
        }
        return state.update('loading', loading => loading.push(actionName))
      },
      deleteLoading(state, { payload }) {
        const [actionName] = payload
        if (!actionName) {
          return state
        }
        return state.update('loading', loading =>
          loading.filter(item => item !== actionName)
        )
      }
    }
  },
  effects: {
    *updateSideMenus(payload, effects, actionName) {
      try {
        const [pathname] = payload
        const sideMenu = parsePath(pathname, routes)
        yield effects.put({ type: 'setSideMenu', sideMenu })
        throw new Error()
      } catch (error) {
        console.log(error, 222222)
        // 这里可以不用trycatch，但如果有trycatch，一定必须要throw error
        throw error
      }
    },

    *setOpenKeys(payload, effects) {
      const [openKeys] = payload
      yield effects.put({ type: 'setSideMenu', sideMenu: { openKeys } })
    }
  }
})
