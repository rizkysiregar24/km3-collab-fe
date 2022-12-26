/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BiUserCircle } from 'react-icons/bi';

import { Button } from '../../components/Input';
import { Layout } from '../../components/Layout';

const API_URL = process.env.REACT_APP_AUTH_API;

export function Booking() {
  const [data, setData] = useState([]);
  const [ticketData, setTicketData] = useState(null);

  const valiadteForms =
    data?.filter((x) => x?.email && x?.firstName && x?.phone)?.length === data?.length;

  const [searchParams] = useSearchParams();
  const passengers = searchParams.get('passengers');
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    airlineName,
    departureAirport,
    arrivalAirport,
    departure,
    arrival,
    departureTime,
    price
  } = ticketData ?? {};

  const handleTransaction = async () => {
    try {
      const { data: transactionData, status: transactionStatus } = await axios.post(
        `${API_URL}/transaction`,
        {
          flight_id: Number(id),
          passenger: data
        },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );

      const paymentCode = await transactionData.data.transaction.payment_code;

      if (transactionStatus === 200 && paymentCode) {
        navigate(`/payment/${paymentCode}`);
      }

      return null;
    } catch (error) {
      toast(
        `${error.response.data.message} 
      please log in to book`,
        {
          type: 'error',
          className: 'capitalize'
        }
      );
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
    return null;
  };

  const handleChange = (index, name, value) => {
    const newData = data.map((d, i) => {
      if (index === i) {
        return { ...d, [name]: value };
      }
      return d;
    });
    setData(newData);
  };

  useEffect(() => {
    (async () => {
      const { data: ticketResponse } = await axios.get(`${API_URL}/flight/data/${id}`);
      setTicketData(ticketResponse?.data);
    })();
  }, []);

  useEffect(() => {
    if (Number(passengers) > 0) {
      const passengerData = {
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        type: 'adult'
      };
      const passengersData = [];
      Array.from({ length: passengers }, () => {
        passengersData.push(passengerData);
      });
      setData(passengersData);
    }
  }, [passengers]);

  return (
    <Layout title="Booking" className="bg-slate-100">
      <div className="flex justify-center my-4">
        <ul className="steps w-full">
          <li className="step step-primary">Book</li>
          <li className="step">Pay</li>
          <li className="step">E-ticket</li>
        </ul>
      </div>
      <div className="flex justify-around flex-wrap flex-col-reverse md:flex-row mx-8 gap-4">
        <div className="flex flex-col flex-wrap bg-white flex-[2] rounded-[4px]">
          <h1 className="text-xl px-8 pt-4 font-bold inline-flex items-center gap-2">
            <BiUserCircle size="32" /> Data Passengers
          </h1>
          {data.length > 0 &&
            data.map((v, i) => (
              <div className="p-8 flex flex-col gap-4" key={i}>
                <h2 className="font-semibold bg-[#F5F6FA] text-xl p-3 rounded-[4px]">
                  Passenger {i + 1}
                </h2>
                <form onSubmit={handleTransaction} disabled={!valiadteForms}>
                  <label htmlFor="email" className="flex flex-col text-sm font-semibold gap-[6px]">
                    Email
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="johndoe@mail.com"
                      className="input input-primary w-full "
                      onChange={(e) => {
                        handleChange(i, e.target.name, e.target.value);
                      }}
                      value={data[i]?.email}
                      required
                    />
                  </label>
                  <label
                    htmlFor="firstName"
                    className="flex flex-col text-sm font-semibold gap-[6px]">
                    Fisrt Name
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      className="input input-primary "
                      onChange={(e) => {
                        handleChange(i, e.target.name, e.target.value);
                      }}
                      value={data[i]?.firstName}
                      required
                    />
                  </label>
                  <label
                    htmlFor="lastName"
                    className="flex flex-col text-sm font-semibold gap-[6px]">
                    Last Name{' '}
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      className="input input-primary "
                      onChange={(e) => {
                        handleChange(i, e.target.name, e.target.value);
                      }}
                      value={data[i]?.lastName}
                      required
                    />
                  </label>
                  <label htmlFor="phone" className="flex flex-col text-sm font-semibold gap-[6px]">
                    Phone number
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="081221334556"
                      className="input input-primary "
                      onChange={(e) => {
                        handleChange(i, e.target.name, e.target.value);
                      }}
                      value={data[i]?.phone}
                      required
                    />
                  </label>
                  <label htmlFor="type" className="flex flex-col text-sm font-semibold gap-[6px]">
                    Passenger type
                    <select
                      name="type"
                      id="type"
                      className="select select-primary w-full"
                      onChange={(e) => {
                        handleChange(i, e.target.name, e.target.value);
                      }}
                      value={data[i]?.type}>
                      <option value="adult">Adult</option>
                      <option value="child">Child</option>
                    </select>
                  </label>
                </form>
              </div>
            ))}
          <Button
            className="my-4 md:hidden block"
            onClick={handleTransaction}
            type="submit"
            disabled={!valiadteForms}>
            Proceed to payment
          </Button>
        </div>

        <div className="p-10 md:p-6 flex flex-col gap-3 bg-white h-min rounded-md md:ml-4 flex-1 md:sticky self-start md:top-0">
          <h2 className="font-bold text-xl">Flight Detail</h2>
          <p className="text-base font-semibold">
            {departureAirport} &rarr; {arrivalAirport}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-semibold flex-wrap">
              {airlineName} - {departure} &rarr; {arrival} - {departureTime}
            </div>
          </div>
          <div className="border-t-2">
            <p className="text-xl mt-2">
              Total Price{' '}
              <span className="font-semibold">
                Rp.{' '}
                {passengers
                  ? new Intl.NumberFormat('ID-id').format(passengers * price ?? 0)
                  : new Intl.NumberFormat('ID-id').format(price ?? 0)}
              </span>
            </p>
          </div>
        </div>

        <div className="mx-auto basis-[100vw] md:flex md:justify-center hidden z-10">
          <Button
            className="my-4 max-w-xl mx-auto"
            onClick={handleTransaction}
            disabled={!valiadteForms}>
            Proceed to payment
          </Button>
        </div>
      </div>
    </Layout>
  );
}
