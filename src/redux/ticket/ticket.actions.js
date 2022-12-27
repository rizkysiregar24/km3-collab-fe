import axios from 'axios';

import { _setTicketData, _resetData, _getAllTickets } from './ticket.slice';

const BASE_URL = process.env.REACT_APP_AUTH_API;

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

export const getAllTickets =
  (page = 1) =>
  async (dispatch) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/flight/data?page=${page}`, {
      headers: { Authorization: token }
    });
    const responseData = await response.data;
    dispatch(_getAllTickets(responseData.data));
  };
