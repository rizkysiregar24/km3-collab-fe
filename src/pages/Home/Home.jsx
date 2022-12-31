/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdSwap } from 'react-icons/io';

import './Home.css';
import SEAT_CLASS from '../../utils/seatClass';
import FeatureSection from './FeatureSection';
import { defaultAirportSelected } from '../../utils/airports';
import {
  dayAfterTomorrow,
  today,
  tomorrow,
  isLessThanToday,
  historyStartDate
} from '../../utils/dates';
import { Layout } from '../../components/Layout';
import { SeatIcon, SearchIcon } from '../../components/Icons';
import { RadioButton, AirportSelect, Button, InputDate } from '../../components/Input';
import Inspiration from './Inspiration';

export function Home() {
  // State definition
  const [startDate, setStartDate] = useState(
    !isLessThanToday(historyStartDate) ? today : isLessThanToday(historyStartDate)
  );
  const [tripType, setTripType] = useState(localStorage.getItem('historyTripType') ?? 'one_way');
  const [adult, setAdult] = useState(1);
  const [departure, setDeparture] = useState(
    JSON.parse(localStorage.getItem('historyDeparture')) ?? defaultAirportSelected.departure
  );
  const [returnDate, setReturnDate] = useState(dayAfterTomorrow);
  const [arrival, setArrival] = useState(
    JSON.parse(localStorage.getItem('historyArrival')) ?? defaultAirportSelected.arrival
  );
  const [seatClass, setSeatClass] = useState('economy');

  const image =
    'https://images.unsplash.com/photo-1437846972679-9e6e537be46e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80';

  const navigate = useNavigate();

  const isSameAirpot = Object.entries(departure).toString() === Object.entries(arrival).toString();
  const isSameAirportEqualNull = departure === null && arrival === null;

  const bgStyles = {
    backgroundImage: `url(${image})`,
    backgroundColor: '  rgba(0, 0, 0, 0.20)',
    backgroundBlendMode: 'multiply',
    objectPosition: 'center',
    objectFit: 'cover',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  };

  // Function definition

  const handleSearchFlight = () => {
    navigate(
      `/search?departure=${departure.value}&arrival=${
        arrival.value
      }&passengers=${adult}&tripType=${tripType}&sc=${seatClass}&date=${startDate}${
        tripType === 'round_trip' ? `&returnDate=${returnDate}` : ''
      }`
    );
  };

  const handleRoundTrip = () => {
    setTripType('round_trip');
    localStorage.setItem('historyTripType', 'round_trip');
  };

  const handleOneWay = () => {
    setTripType('one_way');
    localStorage.setItem('historyTripType', 'one_way');
  };

  const handleSwapDestination = (e) => {
    e.preventDefault();
    setDeparture(arrival);
    setArrival(departure);
  };

  const incrementAdultPassenger = (e) => {
    e.preventDefault();
    if (adult === 5) {
      return;
    }
    setAdult(adult + 1);
  };

  const decrementAdultPassenger = (e) => {
    e.preventDefault();
    if (adult === 1) {
      return;
    }
    setAdult(adult - 1);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center md:py-20 py-8" style={bgStyles}>
        <div className="flex flex-col items-center">
          <h1 className="font-bold mx-4 text-4xl lg:text-5xl text-white bg-clip-text bg-gradient-to-tr from-[#0b6cff] to-[#512bd4] p-2">
            Find best ticket price for your next journey
          </h1>
          <div className="bg-white rounded-md shadow-md md:w-auto w-11/12 my-8 p-8">
            <form>
              <fieldset>
                <div className="flex gap-8 items-center flex-wrap">
                  <RadioButton
                    id="tripChoice1"
                    name="trip"
                    label="One way"
                    onChange={handleOneWay}
                    value={tripType === 'one_way'}
                    title="One way"
                  />
                  <RadioButton
                    id="tripChoice2"
                    name="trip"
                    label="Round trip"
                    onChange={handleRoundTrip}
                    value={tripType === 'round_trip'}
                    title="Round trip"
                  />
                  <Button
                    onClick={handleSwapDestination}
                    title="Swap Airports"
                    className="text-brand hover:bg-brand-darker-800 btn-sm btn-outline flex items-center gap-2 font-semibold w-full md:w-auto outline-brand border-brand bg-transparent">
                    <IoMdSwap size={24} />
                    <p>Swap Airports</p>
                  </Button>
                </div>
              </fieldset>
              <div className="flex gap-4 mt-4 flex-wrap flex-col md:flex-row md:justify-start justify-center">
                <div className="md:w-[250px] w-full">
                  <label className="font-semibold">From</label>
                  <AirportSelect
                    placeholder="Where from?"
                    value={departure}
                    onChange={(choice) => {
                      setDeparture(choice);
                      localStorage.setItem('historyDeparture', JSON.stringify(choice));
                    }}
                  />
                  {isSameAirpot && !isSameAirportEqualNull ? (
                    <small className="text-error">Airpot cannot be same</small>
                  ) : null}
                </div>
                <div className="md:w-[250px] w-full">
                  <label className="font-semibold">To</label>
                  <AirportSelect
                    placeholder="Where to?"
                    value={arrival}
                    onChange={(choice) => {
                      setArrival(choice);
                      localStorage.setItem('historyArrival', JSON.stringify(choice));
                    }}
                  />
                </div>
                <div className="md:w-[200px] w-full">
                  <label className="font-semibold">No. of Passengers</label>
                  <div className="dropdown md:w-[200px] w-full cursor-pointer">
                    <p
                      tabIndex={0}
                      className="input input-primary flex items-center border-[#cccccc] border text-gray-900 md:w-[200px] w-full rounded-[4px] select-none">
                      {adult} Passengers
                    </p>
                    <div
                      tabIndex={0}
                      className="dropdown-content card card-compact w-64 bg-white text-black mt-1 rounded-[4px] shadow-md shadow-indigo-200">
                      <div className="card-body">
                        <div className="flex items-center justify-between">
                          <div>Passengers</div>
                          <div className="flex gap-4 items-center">
                            <button
                              className="btn btn-outline btn-sm"
                              onClick={decrementAdultPassenger}
                              type="button">
                              -
                            </button>
                            {adult}
                            <button
                              className="btn btn-outline btn-sm"
                              onClick={incrementAdultPassenger}
                              type="button">
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-4 md:mt-8 flex-wrap md:flex-row flex-col ">
                <div className="flex flex-col md:w-[250px] w-full">
                  <label className="font-semibold">Departure Date</label>
                  <InputDate
                    value={startDate}
                    onChange={(e) => {
                      localStorage.setItem('historyStartDate', e.target.value);
                      setStartDate(e.target.value);
                    }}
                    min={today}
                    required
                    title="Departure date"
                  />
                </div>
                <div
                  className={`flex flex-col md:w-[250px] w-full ${
                    tripType === 'one_way' ? 'hidden sm:block' : 'visible'
                  }`}>
                  <label className="font-semibold">Return Date</label>
                  <InputDate
                    value={returnDate}
                    onChange={(e) => {
                      localStorage.setItem('historyReturnDate', returnDate);
                      setReturnDate(e.target.value);
                    }}
                    min={tomorrow}
                    required
                    disabled={tripType === 'one_way'}
                    title="Return date"
                  />
                </div>
                <div className="flex flex-col md:w-[200px] w-full">
                  <label className="font-semibold">Seat Class</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <SeatIcon />
                    </div>
                    <select
                      className="input input-primary rounded-[4px] border-[#cccccc] border text-gray-900 text-sm block w-full pl-10 p-2.5 appearance-none cursor-pointer"
                      value={seatClass}
                      onChange={(e) => setSeatClass(e.target.value)}
                      title="Seat class">
                      {SEAT_CLASS.map((item) => (
                        <option value={item.value} key={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  className="sm:w-auto w-full"
                  onClick={handleSearchFlight}
                  disabled={!departure || !arrival || isSameAirpot || !startDate || !returnDate}>
                  <SearchIcon />
                  Search Flights
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Inspiration />

      <FeatureSection />
    </Layout>
  );
}
