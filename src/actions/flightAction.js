export const actionTypes = {
    GET_FLIGHT_DESTINATION_LIST: "GET_FLIGHT_DESTINATION_LIST",
    GET_FLIGHT_DESTINATION_LIST_SUCCESS: "GET_FLIGHT_DESTINATION_LIST_SUCCESS",
    SEARCH_FLIGHT_DETAIL:"SEARCH_FLIGHT_DETAIL",
    SEARCH_FLIGHT_DETAIL_SUCCESS:"SEARCH_FLIGHT_DETAIL_SUCCESS",
    SEARCH_FLIGHT_DETAIL_FAIL:"SEARCH_FLIGHT_DETAIL_FAIL",
    STORE_SEARCH_FLIGHT_RECORD:"STORE_SEARCH_FLIGHT_RECORD",
    BOOK_FLIGHT:"BOOK_FLIGHT",
    BOOK_FLIGHT_SUCCESS:"BOOK_FLIGHT_SUCCESS",
    BOOK_FLIGHT_FAIL:"BOOK_FLIGHT_FAIL",
    SEARCH_FLIGHT_BY_REFERENCE:"SEARCH_FLIGHT_BY_REFERENCE",
    SEARCH_FLIGHT_BY_REFERENCE_SUCCESS:"SEARCH_FLIGHT_BY_REFERENCE_SUCCESS",

  };
  
  export const GetFlightDestination = () => {
    return {
      type: actionTypes.GET_FLIGHT_DESTINATION_LIST,
    };
  };

  export const SearchFlightDetail = (keyvalue) => {
    return {
      type: actionTypes.SEARCH_FLIGHT_DETAIL,
      payload:keyvalue
    };
  };

  export const SearchFlightRecord = (id,passenger) => {
    return {
      type: actionTypes.STORE_SEARCH_FLIGHT_RECORD,
      flightDetail:id,
      passenger:passenger
    };
  };
  export const BookPassengerFlight = (record,id,passenger) => {
    return {
      type: actionTypes.BOOK_FLIGHT,
      record:record,
      id:id,
      passenger:passenger
    };
  };

  export const SearchFlightByReference = (keyvalue) => {
    return {
      type: actionTypes.SEARCH_FLIGHT_BY_REFERENCE,
      payload:keyvalue
    };
  };