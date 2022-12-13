import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./redux/counter/counter.slice";
import userReducer from "./redux/user/user.slice";
import ticketReducer from "./redux/ticket/ticket.slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    ticket: ticketReducer,
  },
});
