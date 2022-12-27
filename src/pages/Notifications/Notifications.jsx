import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Layout } from '../../components/Layout';

export function Notifications() {
  const [notif, setNotif] = useState([]);
  const API_URL = process.env.REACT_APP_AUTH_API;

  useEffect(() => {
    const config = {
      method: 'get',
      url: `${API_URL}/notification/user/data`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    };

    axios(config)
      .then((response) => {
        setNotif(response.data);
      })
      .catch((error) => {
        toast(error);
      });
  }, []);

  return (
    <Layout>
      <div className="h-screen">Notifications Page</div>
      <div>{notif.id}</div>
    </Layout>
  );
}
