import { bindActionCreators } from "redux"

export const GET_USER = "engine/GET_USER"
export const getUser = () => ({ type: GET_USER })

export const SET_USER = "engine/SET_USER"
export const setUser = userInfo => ({ type: SET_USER, userInfo })

export const containerActions = dispatch =>
  bindActionCreators(
    {
      getUser
    },
    dispatch
  )
