/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { ExpediaCard } from '../../components/Cards';
import { Layout } from '../../components/Layout';

const BASE_URL = process.env.REACT_APP_AUTH_API;

export function SearchResult() {
  const [resultData, setResultData] = useState(null);
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
      try {
        (async () => {
          const { data } = await axios.get(
            `${BASE_URL}/schedule/search?departure=${departure}&arrival=${arrival}&date=${fromDate}&sc=${seatClass}&tripType=${tripType}&passengers=${passengers}`
          );
          setResultData(data?.data);
        })();
      } catch (error) {
        return error;
      }
    }
    if (tripType === 'round_trip') {
      try {
        (async () => {
          const { data } = await axios.get(
            `${BASE_URL}/schedule/search?departure=${departure}&arrival=${arrival}&date=${fromDate}&sc=${seatClass}&tripType=${tripType}&passengers=${passengers}&returnDate=${returnDate}`
          );
          setResultData(data?.data);
        })();
      } catch (error) {
        return error;
      }
    }
  }, []);

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
                    id="sort"
                    defaultValue="best"
                    className="select select-bordered w-full max-w-xs select-xs">
                    <option value="best">Best</option>
                    <option value="price">Price</option>
                    <option value="time">Time</option>
                  </select>
                </label>
              </div>
            ) : null}
            {resultData ? (
              resultData
                // ?.sort((a, b) => b.departureTime - a.departureTime)
                // Sort by price & time departure or arrival
                ?.map((ticket) => (
                  <ExpediaCard
                    key={ticket.id}
                    id={ticket.id}
                    airlineName={ticket.airlineName}
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
              <div className="h-96">Ticket not found</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
