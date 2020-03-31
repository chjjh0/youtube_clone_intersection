import { combineReducers } from 'redux';
import videos, { videosSaga } from './videos';
import fixed from './fixed';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ videos, fixed });
export function* rootSaga() {
  yield all([videosSaga()]);
}

export default rootReducer;
