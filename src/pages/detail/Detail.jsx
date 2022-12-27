import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Detail() {
  const [detail, setDetail] = useState([]);
  const API_URL = process.env.REACT_APP_AUTH_API;
  const { id } = useParams();

  useEffect(() => {
    const config = {
      method: 'get',
      url: `${API_URL}/admin/data/${id}`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    };
    axios(config)
      .then((response) => {
        setDetail(response.data.data.detail_user);
      })
      .catch((error) => {
        toast(error);
      });
  }, []);

  return (
    <>
      <div>{detail.id}</div>
      <div>{detail.address}</div>
    </>
  );
}
