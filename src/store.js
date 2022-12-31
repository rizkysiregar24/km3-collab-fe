import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './redux/counter/counter.slice';
import userReducer from './redux/user/user.slice';
import ticketReducer from './redux/ticket/ticket.slice';
import airportReducer from './redux/airport/airport.slice';
import transactionsReducer from './redux/transactions/transactions.slice';
import { setAirport } from './redux/airport/airport.actions';

const airportData = JSON.parse(localStorage.getItem('allAirports'));

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    ticket: ticketReducer,
    airport: airportReducer,
    transactions: transactionsReducer
  }
});

if (!airportData) {
  store.dispatch(setAirport());
}
