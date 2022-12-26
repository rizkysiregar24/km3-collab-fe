import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { Dashboard } from '../../../components/Layout';
import { AirportSelect } from '../../../components/Input';

const today = new Date().toISOString().split('T')[0];

const initialData = {
  code: '',
  airlineName: '',
  departureAirport: '',
  departure: '',
  arrivalAirport: '',
  arrival: '',
  date: today,
  returnDate: '',
  departureTime: '06:00:00',
  arrivalTime: '07:00:00',
  price: +''
};

const token = localStorage.getItem('token');

export default function Ticket() {
  const [data, setData] = useState(initialData);
  const [departure, setDeparture] = useState(null);
  const [arrival, setArrival] = useState(null);
  const [airline, setAirline] = useState('Garuda Indonesia');
  const [seatClass, setSeatClass] = useState('economy');
  const [tripType, setTripType] = useState('one_way');
  const [capacity, setCapacity] = useState(1);

  const reqBody = {
    code: data.code,
    airlineName: airline,
    departureAirport: departure?.airportName,
    departure: departure?.value,
    arrivalAirport: arrival?.airportName,
    arrival: arrival?.value,
    date: data.date,
    departureTime: data.departureTime,
    arrivalTime: data.arrivalTime,
    price: data.price,
    sc: seatClass,
    tripType,
    capacity
  };

  const body =
    tripType === 'one_way'
      ? {
          ...reqBody
        }
      : {
          ...reqBody,
          returnDate: data.returnDate
        };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleAddTicket = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_AUTH_API}/flight/data`,
        {
          ...body
        },
        {
          headers: {
            Authorization: token
          }
        }
      );
      const status = await response.status;

      if (status === 201 || status === 200) {
        toast('Ticket successfully created');
        setData({
          code: '',
          airlineName: '',
          departureAirport: '',
          departure: '',
          arrivalAirport: '',
          arrival: '',
          date: '',
          returnDate: '',
          departureTime: '',
          arrivalTime: '',
          price: +''
        });
      }
    } catch (error) {
      toast(error.response.data.message);
    }
  };

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
                value={data.code}
                maxLength={5}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="airline">Airline</label>
              <select
                className="select select-primary w-full max-w-xs"
                onChange={(e) => setAirline(e.target.value)}>
                <option value="Garuda Indonesia">Garuda Indonesia</option>
                <option value="Batik Air">Batik Air</option>
                <option value="Citylink">Citilink</option>
                <option value="Air Asia">Air Asia</option>
                <option value="Lion Air">Lion Air</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="seatClass">Seat Class</label>
              <select
                className="select select-primary w-full max-w-xs"
                onChange={(e) => setSeatClass(e.target.value)}
                name="seatClass"
                id="seatClass">
                <option value="economy">Economy</option>
                <option value="business">Bussiness</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="totalCapacity">Seat Capacity</label>
              <input
                type="number"
                min={0}
                max={1000}
                className="select select-primary w-full max-w-xs appearance-none"
                onChange={(e) => setCapacity(e.target.value)}
                name="capacity"
                id="totalCapacity"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="tripType">Trip type</label>
              <select
                className="select select-primary w-full max-w-xs"
                onChange={(e) => setTripType(e.target.value)}
                name="tripType"
                id="tripType">
                <option value="one_way">One way</option>
                <option value="round_trip">Round trip</option>
              </select>
            </div>
            <div className="flex flex-col">
              <div className="sm:w-[250px] w-full">
                <label htmlFor="airportDeparture">Airport Departure</label>
                <AirportSelect
                  placeholder="Where from?"
                  value={departure}
                  onChange={setDeparture}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="sm:w-[250px] w-full">
                <label htmlFor="arrivalAirport">Airport Arrival</label>
                <AirportSelect placeholder="Where to?" value={arrival} onChange={setArrival} />
              </div>
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
                value={data.date}
                min={today}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="returnDate">Return Date</label>
              <input
                type="date"
                placeholder="Return Date"
                id="returnDate"
                name="returnDate"
                className="input input-primary"
                onChange={handleChange}
                value={data.returnDate}
                disabled={tripType === 'one_way'}
                min={today}
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
                value={data.departureTime}
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
                value={data.arrivalTime}
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
                value={data.price}
              />
            </div>
            <div className="flex items-center mt-6">
              <button type="button" className="btn btn-primary" onClick={handleAddTicket}>
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </Dashboard>
  );
}
