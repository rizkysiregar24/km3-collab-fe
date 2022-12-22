import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Layout } from '../../components/Layout';

const API_URL = process.env.REACT_APP_AUTH_API;

function Payment() {
  const [ticketData, setTicketData] = useState(null);
  const { paymentId } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_URL}/ticket/${paymentId}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      setTicketData(data);
    })();
  }, []);

  return (
    <Layout>
      <div className="flex justify-center my-4">
        <ul className="steps">
          <li className="step step-primary">Book</li>
          <li className="step step-primary">Pay</li>
          <li className="step">E-ticket</li>
        </ul>
      </div>
      <h1>Payment nih {paymentId}</h1>
      {JSON.stringify(ticketData)}
    </Layout>
  );
}

export default Payment;
