import React, { useState } from 'react';
import Select from 'react-select';

import './Home.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FeatureSection from './FeatureSection';
import SeatIcon from '../../components/Icons/SeatIcon';
import SearchIcon from '../../components/Icons/SearchIcon';
import CalendarIcon from '../../components/Icons/CalendarIcon';
import RadioButton from '../../components/Input/RadioButton';

const options = [
  { value: 'jakarta', label: 'Jakarta (JKTA)' },
  { value: 'surabaya', label: 'Surabaya (SUB)' },
  { value: 'tokyo', label: 'Tokyo (TYOA)' },
];

const SEAT_CLASS = [
  {
    value: 'economy',
    label: 'Economy',
  },
  {
    value: 'premium_economy',
    label: 'Premium Economy',
  },
  {
    value: 'bussiness',
    label: 'Bussiness',
  },
  {
    value: 'first_class',
    label: 'First Class',
  },
];

export function Home() {
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [tripType, setTripType] = useState('one_way');
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);

  // Get date from startDate and add 1 day
  const minDateReturnDate = new Date(startDate).getDate() + 1;
  // Get array of date year, month, day format
  const arrStartDate = new Date(startDate)
    .toISOString()
    .split('T')[0]
    .split('-');
  // get year and month from arrStartDate
  const [startYear, startMonth] = arrStartDate;
  // Now we get the min return date, so it's gonna be startDate + 1 day
  const minReturnDate = [+startYear, +startMonth, minDateReturnDate].join('-');

  const [returnDate, setReturnDate] = useState(minReturnDate);

  // Function definition

  const handleRoundTrip = () => {
    setTripType('round_trip');
  };

  const handleOneWay = () => {
    setTripType('one_way');
  };

  const incrementAdultPassenger = (e) => {
    e.preventDefault();
    if (adult + child === 7) {
      return;
    }
    setAdult(adult + 1);
  };

  const incrementChildPassenger = (e) => {
    e.preventDefault();
    if (adult + child === 7) {
      return;
    }
    setChild(child + 1);
  };

  const decrementChildPassenger = (e) => {
    e.preventDefault();
    if (child === 0) {
      return;
    }
    setChild(child - 1);
  };

  const decrementAdultPassenger = (e) => {
    e.preventDefault();
    if (adult === 0) {
      return;
    }
    setAdult(adult - 1);
  };

  return (
    <div className="mx-auto">
      <Navbar />
      <div className="flex flex-col items-center object-cover object-center bg-cover bg-no-repeat bg-slate-100 md:py-20 py-8">
        <h1 className="font-bold mx-4 text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-tr from-indigo-500 to-blue-500 p-2">
          Find best ticket price for your next journey
        </h1>
        <div className="bg-white rounded-md shadow-md shadow-indigo-200 sm:w-auto w-11/12 my-8 p-8">
          <form>
            <fieldset>
              <div className="flex gap-8">
                <RadioButton
                  id="tripChoice1"
                  name="trip"
                  label="One way"
                  onChange={handleOneWay}
                  value={tripType === 'one_way'}
                />
                <RadioButton
                  id="tripChoice2"
                  name="trip"
                  label="Round trip"
                  onChange={handleRoundTrip}
                  value={tripType === 'round_trip'}
                />
              </div>
            </fieldset>
            <div className="flex gap-4 mt-4 flex-wrap flex-col sm:flex-row sm:justify-start justify-center">
              <div className="sm:w-[170px] w-full">
                <label className="font-semibold">From</label>
                <Select options={options} />
              </div>
              <div className="sm:w-[170px] w-full">
                <label className="font-semibold">To</label>
                <Select options={options} />
              </div>
              <div className="sm:w-[200px] w-full">
                <label className="font-semibold">No. of Passengers</label>
                <div className="dropdown sm:w-[200px] w-full">
                  <p
                    tabIndex={0}
                    className="input flex items-center h-10 border-[#cccccc] border text-gray-900 sm:w-52 w-full"
                  >
                    {adult} Adult, {child} Children
                  </p>
                  <div
                    tabIndex={0}
                    className="dropdown-content card card-compact w-64 p-2 bg-slate-100 text-black mt-1 rounded-[4px] shadow-md shadow-indigo-200"
                  >
                    <div className="card-body">
                      <div className="flex items-center justify-between">
                        <div>Adult</div>
                        <div className="flex gap-4 items-center">
                          <button
                            className="btn btn-circle btn-sm"
                            onClick={incrementAdultPassenger}
                          >
                            +
                          </button>
                          {adult}
                          <button
                            className="btn btn-circle btn-sm"
                            onClick={decrementAdultPassenger}
                          >
                            -
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>Children</div>
                        <div className="flex gap-4 items-center">
                          <button
                            className="btn btn-circle btn-sm"
                            onClick={incrementChildPassenger}
                          >
                            +
                          </button>
                          {child}
                          <button
                            className="btn btn-circle btn-sm"
                            onClick={decrementChildPassenger}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-8 flex-wrap sm:flex-row flex-col ">
              <div className="flex flex-col sm:w-[170px] w-full">
                <label className="font-semibold">Departure Date</label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <CalendarIcon />
                  </div>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={today}
                    required
                    className="input rounded-[4px] border-[#cccccc] border text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 h-10"
                  />
                </div>
              </div>
              <div
                className={`flex flex-col sm:w-[170px] w-full ${
                  tripType === 'one_way'
                    ? 'hidden sm:block sm:invisible'
                    : 'visible'
                }`}
              >
                <label className="font-semibold">Return Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <CalendarIcon />
                  </div>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => {
                      setReturnDate(e.target.value);
                    }}
                    min={minReturnDate}
                    required
                    disabled={tripType === 'one_way'}
                    className="input rounded-[4px] border-[#cccccc] border text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 h-10"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:w-[200px] w-full">
                <label className="font-semibold">Seat Class</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SeatIcon />
                  </div>
                  <select className="input rounded-[4px] border-[#cccccc] border text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 h-10">
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
              <button className="w-full sm:w-auto font-semibold inline-flex items-center justify-center md:justify-start btn btn-primary bg-brand hover:bg-brand-hover">
                <SearchIcon />
                Search Flights
              </button>
            </div>
          </form>
        </div>
      </div>
      <FeatureSection />
      <Footer />
    </div>
  );
}
