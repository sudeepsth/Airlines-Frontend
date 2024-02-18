import { all } from 'redux-saga/effects';
import flightSaga from './flightSaga';

function* rootSaga() {
  yield all([
    flightSaga(),
  ]);
}

export default rootSaga;