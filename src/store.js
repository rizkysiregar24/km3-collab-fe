import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./redux/counter/counter.slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
