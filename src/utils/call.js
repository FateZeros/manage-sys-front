import { call, put, select } from 'redux-saga/effects'
import { actions } from '../engine/Engine.service'

/**
 *
 * @param {Function} fn
 * @param {Object | String} payload
 * @param {String} actionName
 * @example
 * yield call(api.getUser)
 * @example
 * yield call(api.getUser, 'GET_USER')
 * @example
 * yield call(api.getUser, id, 'GET_USER')
 */
export default function* callee(fn, payload, actionName) {
  if (
    arguments.length === 2 &&
    Object.prototype.toString.call(payload) === '[object String]'
  ) {
    actionName = payload
  }
  yield put(actions.setLoading(actionName))

  try {
    const response = yield call(fn, payload)
    yield put(actions.deleteLoading(actionName))
    return response
  } catch (error) {
    console.log('error: ', error)
    const state = yield select(state => state.engine)
    console.log('state: ', state)
    yield put(actions.deleteLoading(actionName))
    throw error
  }
}
