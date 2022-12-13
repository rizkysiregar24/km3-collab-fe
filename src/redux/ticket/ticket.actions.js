import { _setTicketData, _resetData } from "./ticket.slice";

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
    price,
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
        price,
      })
    );
  };

export const resetData = () => (dispatch) => {
  dispatch(_resetData());
};
