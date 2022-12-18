import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '../../components/Input';
import { Layout } from '../../components/Layout';

const API_URL = process.env.REACT_APP_AUTH_API;

export function Booking() {
  const [data, setData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  const { id } = useParams();
  const { id: userId } = JSON.parse(localStorage.getItem('user'));

  const handleTransaction = async () => {
    try {
      const { data: transactionData } = await axios.post(
        `${API_URL}/transaction`,
        {
          // isPaid: Number(id),
          flight_id: Number(id)
        },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      return transactionData;
    } catch (error) {
      return error;
    }
  };

  const handlePassengersData = async () => {
    try {
      const { data: passengersData } = await axios.post(
        `${API_URL}/passengers/data`,
        {
          ...data
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return passengersData;
    } catch (error) {
      return error;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Layout>
      <div className="p-8">
        <h1>
          Data penumpang {id} - {userId}
        </h1>
        <form className="max-w-lg">
          <label htmlFor="email" className="flex flex-col">
            Email
            <input
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@mail.com"
              className="input input-primary"
              onChange={handleChange}
              value={data.email}
            />
          </label>
          <label htmlFor="firstName" className="flex flex-col">
            Fisrt Name
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              className="input input-primary"
              onChange={handleChange}
              value={data.firstName}
            />
          </label>
          <label htmlFor="lastName" className="flex flex-col">
            Last Name
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              className="input input-primary"
              onChange={handleChange}
              value={data.lastName}
            />
          </label>
          <label htmlFor="phone" className="flex flex-col">
            Phone number
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="+6281000100101"
              className="input input-primary"
              onChange={handleChange}
              value={data.phone}
            />
          </label>
          <Button
            className="mt-4"
            onClick={() => {
              handleTransaction();
              handlePassengersData();
            }}>
            Submit
          </Button>
        </form>
      </div>
    </Layout>
  );
}
