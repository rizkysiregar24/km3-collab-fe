import axios from 'axios';

import { _setTicketData, _resetData, _getAllTickets } from './ticket.slice';

const BASE_URL = process.env.REACT_APP_AUTH_API;
const token = localStorage.getItem('token');

export const setTicketData =
  ({
    code,
    airlineName,
    departureAirport,
    departure,
    arrivalAirport,
    arrival,
    date,
    departureTime,
    arrivalTime,
    price
  }) =>
  (dispatch) => {
    dispatch(
      _setTicketData({
        code,
        airlineName,
        departureAirport,
        departure,
        arrivalAirport,
        arrival,
        date,
        departureTime,
        arrivalTime,
        price
      })
    );
  };

export const resetData = () => (dispatch) => {
  dispatch(_resetData());
};

export const getAllTickets = () => async (dispatch) => {
  const response = await axios.get(`${BASE_URL}/flight/data`, {
    headers: { Authorization: token }
  });
  const responseData = await response.data;
  dispatch(_getAllTickets(responseData.data));
};
