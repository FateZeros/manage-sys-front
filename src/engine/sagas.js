import { call } from "redux-saga/effects"
import serverApi from "src/api"

export function* rootSaga() {
  yield call(serverApi.getOrgInfoBusers, "")
}
