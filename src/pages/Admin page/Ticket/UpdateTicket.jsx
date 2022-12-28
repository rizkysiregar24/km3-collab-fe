/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { Dashboard } from '../../../components/Layout';

const token = localStorage.getItem('token');
const API_URL = process.env.REACT_APP_AUTH_API;

export default function UpdateTicket() {
  const [data, setData] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleUpdateTicket = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      `${API_URL}/flight/data/${id}`,
      {
        ...data
      },
      {
        headers: {
          Authorization: token
        }
      }
    );
    const status = await response.status;

    if (status === 201 || status === 200) {
      toast('Ticket successfully updated');
      navigate('/ticket');
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${API_URL}/flight/data/${id}`, {
        headers: {
          Authorization: token
        }
      });
      setData(res.data.data);
    };
    getData();
  }, []);

  return (
    <Dashboard>
      <div className="p-8">
        <h1 className="text-3xl">Add Ticket</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex gap-4 flex-wrap mx-4">
            <div className="flex flex-col">
              <label htmlFor="code">Code</label>
              <input
                type="text"
                placeholder="Code"
                id="code"
                name="code"
                className="input input-primary"
                onChange={handleChange}
                value={data?.code}
                maxLength={5}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="airline">Airline</label>
              <input
                type="text"
                placeholder="Airline"
                id="airline"
                name="airlineName"
                className="input input-primary"
                onChange={handleChange}
                value={data?.airlineName}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="airportDeparture">Airport Departure</label>
              <input
                type="text"
                placeholder="Airport Departure"
                id="airportDeparture"
                name="departureAirport"
                className="input input-primary"
                onChange={handleChange}
                value={data?.departureAirport}
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="departureCode">Airport IATA Departure</label>
              <input
                type="text"
                placeholder="Airport IATA Departure"
                id="departureCode"
                name="departure"
                className="input input-primary"
                onChange={handleChange}
                value={data?.departure}
                maxLength={3}
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="arrivalAirport">Airport Arrival</label>
              <input
                type="text"
                placeholder="Airport Arrival"
                id="arrivalAirport"
                name="arrivalAirport"
                className="input input-primary"
                onChange={handleChange}
                value={data?.arrivalAirport}
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="arrivalCode">Airport IATA Arrival</label>
              <input
                type="text"
                placeholder="Arrival Airport IATA"
                id="arrivalCode"
                name="arrival"
                className="input input-primary"
                onChange={handleChange}
                value={data?.arrival}
                maxLength={3}
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                placeholder="Date"
                id="date"
                name="date"
                className="input input-primary"
                onChange={handleChange}
                value={data?.date}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="timeDeparture">Time Departure</label>
              <input
                type="time"
                placeholder="Time Departure"
                id="timeDeparture"
                name="departureTime"
                className="input input-primary"
                onChange={handleChange}
                value={data?.departureTime}
              />
            </div>{' '}
            <div className="flex flex-col">
              <label htmlFor="timeArrival">Time Arrival</label>
              <input
                type="time"
                placeholder="Time Arrival"
                id="timeArrival"
                name="arrivalTime"
                className="input input-primary"
                onChange={handleChange}
                value={data?.arrivalTime}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                placeholder="1000000"
                id="price"
                name="price"
                className="input input-primary"
                onChange={handleChange}
                value={data?.price}
              />
            </div>
            <div className="flex items-center mt-6 gap-2">
              <button type="button" className="btn btn-primary" onClick={handleUpdateTicket}>
                Update
              </button>
              <button
                type="button"
                className="btn btn-primary btn-outline"
                onClick={() => {
                  navigate('/ticket');
                }}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </Dashboard>
  );
}
