import React, { useState } from "react";
import axios from "axios";

import { Dashboard } from "../../../components/Layout";

const initialData = {
  code: "",
  airlineName: "",
  departureAirport: "",
  departure: "",
  arrivalAirport: "",
  arrival: "",
  date: "",
  departureTime: "",
  arrivalTime: "",
  price: +"",
};

const token = localStorage.getItem("token");

export default function Ticket() {
  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleAddTicket = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${process.env.REACT_APP_AUTH_API}/flight/data`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const status = await response.status;
    const ticketData = await response.data;

    if (status === 201 || status === 200) {
      alert(JSON.stringify(ticketData));
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
              <input
                type="text"
                placeholder="Airline"
                id="airline"
                name="airlineName"
                className="input input-primary"
                onChange={handleChange}
                value={data.airlineName}
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
                value={data.departureAirport}
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
                value={data.departure}
                maxLength={3}
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
                value={data.arrivalAirport}
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
                value={data.arrival}
                maxLength={3}
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
                value={data.date}
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
            </div>{" "}
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddTicket}
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </Dashboard>
  );
}
