import axios from "axios";

const BASE_URL = 'http://localhost:8000/api';

export const httpGetDestinationList = async () => {
    const response = await axios.get(BASE_URL + `/destination-list`);
    return response.data;
  };

export const httpSearchFlightDetail = async (records) => {
    const response = await axios.post(BASE_URL + `/search-flight`,
        records
    );
    return response.data;
  };
export const httpBookFlight = async (records) => {
    const response = await axios.post(BASE_URL + `/book-flight`,
        records
    );
    return response.data;
  };

export const httpTrackFlight = async (reference) => {
    const response = await axios.get(BASE_URL + `/track-flight/${reference}`
    );
    return response.data;
  };