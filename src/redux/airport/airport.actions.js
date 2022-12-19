import axios from 'axios';

import { _setAirport } from './airport.slice';

const BASE_URL = process.env.REACT_APP_AUTH_API;

export const setAirport = () => async (dispatch) => {
  const response = await axios.get(`${BASE_URL}/airport/indonesia`);
  const { data } = await response;
  localStorage.setItem('allAirports', JSON.stringify(data.data));
  dispatch(_setAirport(data.data));
};
