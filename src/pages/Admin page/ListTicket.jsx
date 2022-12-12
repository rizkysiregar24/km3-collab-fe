import React, { useState, useEffect } from "react";
import axios from "axios";

import { Dashboard } from "../../components/Layout";

const BASE_URL = process.env.REACT_APP_AUTH_API;
const token = localStorage.getItem("token");

function ListTicket() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${BASE_URL}/flight/data/`, {
        headers: { Authorization: token },
      });
      const responseData = await response.data;
      setData(responseData?.data);
    })();
  }, []);

  const handleDeleteTicket = async (id) => {
    const responseDelete = await axios.delete(`${BASE_URL}/flight/data/${id}}`);
    const responseDeleteData = await responseDelete.data;
    alert(responseDeleteData.data.message);
  };

  return (
    <Dashboard>
      <section className="my-4 mx-2">
        <h1 className="text-2xl mb-4">List of all available tickets</h1>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Airline</th>
                <th>DA</th>
                <th>DA IATA</th>
                <th>AA</th>
                <th>AA IATA</th>
                <th>Date</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((ticket) => (
                <tr key={ticket.id} className="py-2">
                  <th>{ticket.id}</th>
                  <td>{ticket.airlineName}</td>
                  <td>{ticket.departureAirport}</td>
                  <td>{ticket.departure}</td>
                  <td>{ticket.arrivalAirport}</td>
                  <td>{ticket.arrival}</td>
                  <td>{new Date(ticket.date).toDateString()}</td>
                  <td>{ticket.departureTime}</td>
                  <td>{ticket.arrivalTime}</td>
                  <td>
                    Rp. {new Intl.NumberFormat("ID-id").format(ticket.price)}
                  </td>
                  <td>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={handleDeleteTicket(ticket.id)}
                      type="button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Dashboard>
  );
}

export default ListTicket;
