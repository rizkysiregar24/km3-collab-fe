/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

import { Dashboard } from '../../../components/Layout';
import { setTicketData, resetData, getAllTickets } from '../../../redux/ticket/ticket.actions';

const BASE_URL = process.env.REACT_APP_AUTH_API;
const token = localStorage.getItem('token');

function ListTicket() {
  const [refetch, setRefetch] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state.ticket.allTickets);

  const handleDeleteTicket = async (id) => {
    const responseDelete = await axios.delete(`${BASE_URL}/flight/data/${id}`, {
      headers: { Authorization: token }
    });
    const responseDeleteData = await responseDelete.data;
    toast(responseDeleteData.message);
    setRefetch(true);
  };

  useEffect(() => {
    dispatch(resetData());
    dispatch(getAllTickets());
    setRefetch(false);
  }, [refetch]);

  return (
    <Dashboard>
      <section className="my-4 mx-2">
        <h1 className="text-2xl mb-4">List of all available tickets</h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="cursor-pointer">
                <th title="Flight Code">FC</th>
                <th>Airline</th>
                <th title="Departure Airport">DA</th>
                <th title="Departure Airport IATA Code">DAI</th>
                <th title="Arrival Airport">AA</th>
                <th title="Arrival Airport IATA Code">AAI</th>
                <th title="Seat Class">SC</th>
                <th title="Trip Type">TT</th>
                <th>Date</th>
                <th>Return Date</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Passengers</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((ticket, index) => (
                <tr key={index} className="py-2">
                  <td className="uppercase">{ticket.code}</td>
                  <td className="capitalize">{ticket.airlineName}</td>
                  <td>{ticket.departureAirport}</td>
                  <td>{ticket.departure}</td>
                  <td>{ticket.arrivalAirport}</td>
                  <td>{ticket.arrival}</td>
                  <td className="capitalize">{ticket.sc}</td>
                  <td className="capitalize">{ticket.tripType.split('_').join(' ')}</td>
                  <td>{new Date(ticket.date).toDateString()}</td>
                  <td className="text-center">
                    {ticket.returnDate ? new Date(ticket.returnDate).toDateString() : '-'}
                  </td>
                  <td>{ticket.departureTime}</td>
                  <td>{ticket.arrivalTime}</td>
                  <td>{ticket.passengers}</td>
                  <td>Rp. {new Intl.NumberFormat('ID-id').format(ticket.price)}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-xs mr-2"
                      onClick={() => {
                        dispatch(
                          setTicketData({
                            code: ticket.code,
                            airlineName: ticket.airlineName,
                            departureAirport: ticket.departureAirport,
                            departure: ticket.departure,
                            arrivalAirport: ticket.arrivalAirport,
                            arrival: ticket.arrival,
                            date: ticket.date,
                            departureTime: ticket.departureTime,
                            arrivalTime: ticket.arrivalTime,
                            price: ticket.price
                          })
                        );
                        navigate(`/ticket/${ticket.id}`);
                      }}
                      type="button">
                      Update
                    </button>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => {
                        handleDeleteTicket(ticket.id);
                      }}
                      type="button">
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
