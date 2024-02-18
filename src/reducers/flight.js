
import { actionTypes } from "../actions/flightAction";

const initialState = {
	destinationData: [],
	flightRecord:[],
	searchRecord:null,
	passenger:0,
	passengerRecord:null,
	loading: false,
	bookingStatus:null,
	error: null,
	trackFlightRecord:null,
	trackMessage:null
};

const FlightReducer = (state = initialState, action) => {
	// console.log(action, 'asdfgkkjhghjkjk');
	switch (action.type) {
		case actionTypes.GET_FLIGHT_DESTINATION_LIST:
			return {
				...state,
				bookingStatus:null,
				passengerRecord:null,
				trackFlightRecord:null,
				trackMessage:null
			};
		case actionTypes.GET_FLIGHT_DESTINATION_LIST_SUCCESS:
			return {
				...state,
				
				destinationData: action.data
			};
		case actionTypes.STORE_SEARCH_FLIGHT_RECORD:
			return {
				...state,
				flightRecord:[],
				searchRecord: action.flightDetail,
				passenger: action.passenger
			};
		case actionTypes.SEARCH_FLIGHT_DETAIL:
			return {
				...state,
				loading:true
			};
		case actionTypes.SEARCH_FLIGHT_DETAIL_SUCCESS:
			return {
				...state,
				flightRecord: action.data,
				loading:false
			};
		case actionTypes.SEARCH_FLIGHT_DETAIL_FAIL:
			return {
				...state,
				loading:false
			};
		case actionTypes.BOOK_FLIGHT_SUCCESS:
			console.log(action,'action');
			return {
				...state,
				searchRecord:null,
				passenger:0,
				passengerRecord:action.data.passengerRecord,
				bookingStatus:'success',
				loading:false
		};
		case actionTypes.BOOK_FLIGHT_FAIL:
			return {
				...state,
				loading:false
		};
		case actionTypes.SEARCH_FLIGHT_BY_REFERENCE_SUCCESS:
			return {
				...state,
				loading:false,
				trackFlightRecord:action.data.record,
				trackMessage:action.data.message,
		};
		
		
		default:
			return state;
	}
};

export default FlightReducer;