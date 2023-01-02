/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

import { Dashboard } from '../../../components/Layout';
import { setTicketData, resetData, getAllTickets } from '../../../redux/ticket/ticket.actions';
import TableSkeleton from '../../../components/Layout/Skeleton';

const BASE_URL = process.env.REACT_APP_AUTH_API;
const token = localStorage.getItem('token');

function ListTicket() {
  const [refetch, setRefetch] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, error } = useSelector((state) => state.ticket.allTickets);

  const [searchParams, setSearchParams] = useSearchParams({
    page: 1
  });

  const page = searchParams.get('page');
  const { totalPage: totalPages } = data ?? {};

  const handleDecrementPage = () => {
    setSearchParams({
      page: +searchParams.get('page') - 1
    });
  };

  const handleIncrementPage = () => {
    setSearchParams({
      page: +searchParams.get('page') + 1
    });
  };

  const handleAmountPage = (amount) => {
    setSearchParams({
      page: amount
    });
  };

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
    dispatch(getAllTickets(Number(page)));
    setRefetch(false);
  }, [refetch, page]);

  if (error) {
    return (
      <Dashboard>
        <h1 className="text-2xl mb-4">List of all available tickets</h1>
        <p>
          {error}, create one{' '}
          <Link className="underline" to="/create-ticket">
            here
          </Link>
        </p>
      </Dashboard>
    );
  }

  return (
    <Dashboard>
      <section className="my-4 mx-2">
        <h1 className="text-2xl mb-4">List of all available tickets</h1>
        <div className="overflow-x-auto">
          {data?.rows?.length > 0 ? (
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
                  <th>Capacity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.rows?.map((ticket, index) => (
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
                    <td>{ticket.capacity}</td>
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
                          navigate(`/flights/${ticket.id}`);
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
          ) : (
            <TableSkeleton />
          )}
        </div>

        <div className="flex justify-center my-4">
          <div className="btn-group">
            <button
              type="button"
              className="btn"
              disabled={page <= 1}
              onClick={handleDecrementPage}>
              Prev
            </button>
            <button
              type="button"
              className="btn"
              disabled={page >= totalPages}
              onClick={handleIncrementPage}>
              {+page === totalPages ? '' : +page + 1}
            </button>
            <button type="button" className="btn btn-active">
              {page}
            </button>
            <button
              type="button"
              className="btn"
              disabled={page >= totalPages}
              onClick={handleIncrementPage}>
              ...
            </button>
            <button
              type="button"
              className="btn"
              disabled={page >= totalPages}
              onClick={() => handleAmountPage(Number(totalPages))}>
              {totalPages}
            </button>
            <button
              type="button"
              className="btn"
              disabled={page >= totalPages}
              onClick={handleIncrementPage}>
              Next
            </button>
          </div>
        </div>
      </section>
    </Dashboard>
  );
}

export default ListTicket;
