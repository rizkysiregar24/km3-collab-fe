import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_AUTH_API;

export function History() {
  const [transactions, setTransactions] = useState(null);
  console.log(transactions?.map((x) => x.detail_transaction[0]));

  const token = localStorage.getItem('token');

  useEffect(() => {
    (async () => {
      //
      const { data } = await axios.get(`${API_URL}/transaction`, {
        headers: {
          Authorization: token
        }
      });
      setTransactions(data.data);
    })();
  }, []);

  return (
    <div>
      History
      <p>{JSON.stringify(transactions)}</p>
    </div>
  );
}
