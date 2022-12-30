/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { Layout } from '../../components/Layout';
import { ExpediaCard } from '../../components/Cards';
import Spinner from '../../components/Layout/Spinner';
import { getSortedTicket } from '../../utils/tickets';
import CustomModal from '../../components/Modal/CustomModal';
import SearchFormBox from './SearchFormBox';

const BASE_URL = process.env.REACT_APP_AUTH_API;

export function SearchResult() {
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState('best');
  const [isOpen, setIsOpen] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const [searchParams] = useSearchParams();

  const departureParams = searchParams.get('departure');
  const arrivalParams = searchParams.get('arrival');
  const passengers = searchParams.get('passengers');
  const tripTypeParams = searchParams.get('tripType');
  const seatClassParams = searchParams.get('sc');
  const fromDate = searchParams.get('date');
  const returnDateParams = searchParams.get('returnDate');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (tripTypeParams === 'one_way') {
      (async () => {
        try {
          setError(null);
          const { data } = await axios.get(
            `${BASE_URL}/schedule/search?departure=${departureParams}&arrival=${arrivalParams}&date=${fromDate}&sc=${seatClassParams}&tripType=${tripTypeParams}&passengers=${passengers}`
          );
          setResultData(data?.data);
        } catch (err) {
          setError(err);
        }
      })();
    }
    if (tripTypeParams === 'round_trip') {
      (async () => {
        try {
          setError(null);
          const { data } = await axios.get(
            `${BASE_URL}/schedule/search?departure=${departureParams}&arrival=${arrivalParams}&date=${fromDate}&sc=${seatClassParams}&tripType=${tripTypeParams}&passengers=${passengers}&returnDate=${returnDateParams}`
          );
          setResultData(data?.data);
        } catch (err) {
          setError(err);
        }
      })();
    }
    setRefresh(false);
  }, [refresh]);

  if (error) {
    return (
      <Layout>
        <section className="h-[calc(100vh-250px)] flex flex-col justify-center items-center">
          <p className="capitalize mb-4">{error?.response?.data?.message}</p>
          <button className="btn btn-primary bg-brand" onClick={openModal} type="button">
            Change search
          </button>
          <CustomModal
            isOpen={isOpen}
            closeModal={closeModal}
            label="Change search destination"
            className="w-11/12 max-w-4xl">
            <SearchFormBox setRefresh={setRefresh} setIsOpen={setIsOpen} />
            <div className="-mt-14 mx-8 block md:hidden">
              <button className="btn btn-outline w-full" onClick={closeModal} type="button">
                Cancel
              </button>
            </div>
          </CustomModal>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full mx-auto">
        <div className="flex gap-4 justify-center py-4 items-center bg-slate-200 px-4">
          <p className="capitalize">
            {departureParams} &rarr; {arrivalParams} &bull; {new Date(fromDate).toDateString()}{' '}
            &bull; {passengers} passengers &bull; {seatClassParams}
          </p>
          &bull;
          <button className="btn btn-sm btn-info" type="button" onClick={openModal}>
            Change Search
          </button>
        </div>
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
                  query={`departure=${departureParams}&arrival=${arrivalParams}&date=${fromDate}&sc=${seatClassParams}&tripType=${tripTypeParams}&passengers=${passengers}`}
                />
              ))
            ) : (
              <Spinner textContent="Searching your ticket" />
            )}
          </div>
        </div>
      </div>
      <CustomModal
        isOpen={isOpen}
        closeModal={closeModal}
        label="Change search destination"
        className="w-11/12 max-w-4xl">
        <SearchFormBox setRefresh={setRefresh} setIsOpen={setIsOpen} />
        <div className="-mt-14 mx-8 block md:hidden">
          <button className="btn btn-outline w-full" onClick={closeModal} type="button">
            Cancel
          </button>
        </div>
      </CustomModal>
    </Layout>
  );
}
