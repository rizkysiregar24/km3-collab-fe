/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { ExpediaCard } from '../../components/Cards';
import { Layout } from '../../components/Layout';
import Spinner from '../../components/Layout/Spinner';
import { getSortedTicket } from '../../utils/tickets';

const BASE_URL = process.env.REACT_APP_AUTH_API;

export function SearchResult() {
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState('best');
  const [searchParams] = useSearchParams();

  const departure = searchParams.get('departure');
  const arrival = searchParams.get('arrival');
  const passengers = searchParams.get('passengers');
  const tripType = searchParams.get('tripType');
  const seatClass = searchParams.get('sc');
  const fromDate = searchParams.get('date');
  const returnDate = searchParams.get('returnDate');

  useEffect(() => {
    if (tripType === 'one_way') {
      (async () => {
        try {
          setError(null);
          const { data } = await axios.get(
            `${BASE_URL}/schedule/search?departure=${departure}&arrival=${arrival}&date=${fromDate}&sc=${seatClass}&tripType=${tripType}&passengers=${passengers}`
          );
          setResultData(data?.data);
        } catch (err) {
          setError(err);
        }
      })();
    }
    if (tripType === 'round_trip') {
      (async () => {
        try {
          setError(null);
          const { data } = await axios.get(
            `${BASE_URL}/schedule/search?departure=${departure}&arrival=${arrival}&date=${fromDate}&sc=${seatClass}&tripType=${tripType}&passengers=${passengers}&returnDate=${returnDate}`
          );
          setResultData(data?.data);
        } catch (err) {
          setError(err);
        }
      })();
    }
  }, []);

  if (error) {
    return (
      <Layout>
        <section className="h-[calc(100vh-250px)] flex justify-center items-center">
          <p className="capitalize">{error?.response?.data?.message}</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full mx-auto">
        <div className="flex justify-center my-8">
          <div className="flex justify-center items-center max-w-3xl flex-col gap-4 mx-4">
            {resultData ? (
              <div className="flex justify-between w-full">
                <p>Showing {resultData?.length} results</p>
                <label htmlFor="sort">
                  <select
                    name="sort"
                    onChange={(e) => setSort(e.target.value)}
                    className="select select-bordered w-full max-w-xs select-xs">
                    <option value="best">Featured</option>
                    <option value="price">Price: Low to High</option>
                    <option value="priceAsc">Price: High to Low</option>
                    <option value="time">Arrival: Earlier</option>
                    <option value="timeLate">Arrival: Later</option>
                  </select>
                </label>
              </div>
            ) : null}
            {resultData ? (
              getSortedTicket(sort, resultData)?.map((ticket) => (
                <ExpediaCard
                  key={ticket.id}
                  id={ticket.id}
                  airlineName={ticket.airlineName}
                  logo={ticket.airlineLogo}
                  departureAirport={ticket.departureAirport}
                  departureIata={ticket.departure}
                  arrivalAirport={ticket.arrivalAirport}
                  arrivalIata={ticket.arrival}
                  departureTime={ticket.departureTime}
                  arrivalTime={ticket.arrivalTime}
                  price={ticket.price}
                  sc={ticket.sc}
                  passengers={ticket.passengers}
                  tripType={ticket.tripType.split('_').join(' ')}
                  query={`departure=${departure}&arrival=${arrival}&date=${fromDate}&sc=${seatClass}&tripType=${tripType}&passengers=${passengers}`}
                />
              ))
            ) : (
              <Spinner textContent="Searching your ticket" />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
