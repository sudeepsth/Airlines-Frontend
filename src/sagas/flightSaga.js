import { call,put, takeEvery } from 'redux-saga/effects';
import { actionTypes } from "../actions/flightAction";
import {httpGetDestinationList, httpSearchFlightDetail,httpBookFlight, httpTrackFlight} from "../services/api";

function* fetchDestinationList() {
  try {
    const data = yield call(httpGetDestinationList);

    yield put({
        type: actionTypes.GET_FLIGHT_DESTINATION_LIST_SUCCESS,
        data
      });
    
  } catch (error) {
    console.log(error);
  }
}

function* fetchSearchFlight(action) {
  try {
    const data = yield call(httpSearchFlightDetail,action.payload);

    yield put({
        type: actionTypes.SEARCH_FLIGHT_DETAIL_SUCCESS,
        data
      });
    
  } catch (error) {
    console.log(error);
    yield put({
      type: actionTypes.SEARCH_FLIGHT_DETAIL_FAIL,
    });
  }
}

function* fetchBookFlight(action) {
  const record = action.record;
  record.id = action.id;
  record.passenger = action.passenger;

  try {
    const data = yield call(httpBookFlight,record);
    console.log('sagadata',data);
    if(data.status=='success'){
      yield put({
        type: actionTypes.BOOK_FLIGHT_SUCCESS,
        data
      });
    }else if(data.status=='fail')
    {
      yield put({
        type: actionTypes.BOOK_FLIGHT_FAIL,
        data
      });
    }
    
  } catch (error) {
    console.log(error);
    yield put({
      type: actionTypes.BOOK_FLIGHT_FAIL,
    });
  }
}

function* fetchTrackFlight(action) {
  try {
    const data = yield call(httpTrackFlight,action.payload.booking_reference);

    yield put({
        type: actionTypes.SEARCH_FLIGHT_BY_REFERENCE_SUCCESS,
        data
      });
    
  } catch (error) {
    console.log(error);
  
  }
}

function* flightSaga() {
  yield takeEvery(actionTypes.GET_FLIGHT_DESTINATION_LIST, fetchDestinationList);
  yield takeEvery(actionTypes.SEARCH_FLIGHT_DETAIL, fetchSearchFlight);
  yield takeEvery(actionTypes.BOOK_FLIGHT, fetchBookFlight);
  yield takeEvery(actionTypes.SEARCH_FLIGHT_BY_REFERENCE, fetchTrackFlight);
}

export default flightSaga;