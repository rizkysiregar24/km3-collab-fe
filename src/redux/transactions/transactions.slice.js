import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  paid: [],
  unpaid: [],
  experied: []
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    _getTransactionsData: (state, action) => {
      const { data, paid, unpaid, experied } = action.payload;
      state.data = data;
      state.paid = paid;
      state.unpaid = unpaid;
      state.experied = experied;
    }
  }
});

export const { _getTransactionsData } = transactionsSlice.actions;

export default transactionsSlice.reducer;
