import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_AUTH_API;

export default function Cart() {
  const [transactions, setTransactions] = useState(null);

  // const unpaidTransactions = transactions?.filter((x) => x.isPaid === false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_URL}/transaction`, {
        headers: {
          Authorization: token
        }
      });
      setTransactions(data.data);
    })();
  }, []);

  return <div>Cart {transactions}</div>;
}
