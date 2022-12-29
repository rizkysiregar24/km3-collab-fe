import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../../components/Layout/Navbar';

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
        setNotif(response.data.data);
      })
      .catch((error) => {
        toast(error);
      });
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="h-screen">
        <div className="text-2xl font-bold flex mt-5 ml-28">
          Notifications
          <div className="ml-1 bg-red-500 w-3 h-3 rounded-full" />
        </div>
        {notif?.map((x) => (
          <div
            key={x.id}
            className="mx-28 bg-sky-50 rounded-lg mt-5 drop-shadow-md hover:drop-shadow-xl cursor-pointer">
            <div className="mx-5 ">
              <div className="font-bold text-xl text-blue-500 py-1 font-sans">#{x.id}</div>
              <div className="flex">
                <div className="font-bold text-lg font-sans">{x.detail_message}</div>
                <div className="ml-2 text-sm italic mt-1 font-sans">{x.title}</div>
              </div>
              <div className="py-2 text-slate-400  font-sans">
                <div>Created : {x.createdAt}</div>
                <div>Updated : {x.updatedAt}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
