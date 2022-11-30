import React, { useState } from "react";
import Select from "react-select";

import "./Home.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FeatureSection from "./FeatureSection";

const options = [
  { value: "jakarta", label: "Jakarta (JKTA)" },
  { value: "surabaya", label: "Surabaya (SUB)" },
  { value: "tokyo", label: "Tokyo (TYOA)" },
];

const SEAT_CLASS = [
  {
    value: "economy",
    label: "Economy",
  },
  {
    value: "premium_economy",
    label: "Premium Economy",
  },
  {
    value: "bussiness",
    label: "Bussiness",
  },
  {
    value: "first_class",
    label: "First Class",
  },
];

function Home() {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [tripType, setTripType] = useState("one_way");
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);

  // Get date from startDate and add 1 day
  const minDateReturnDate = new Date(startDate).getDate() + 1;
  // Get array of date year, month, day format
  const arrStartDate = new Date(startDate)
    .toISOString()
    .split("T")[0]
    .split("-");
  // get year and month from arrStartDate
  const [startYear, startMonth] = arrStartDate;
  // Now we get the min return date, so it's gonna be startDate + 1 day
  const minReturnDate = [+startYear, +startMonth, minDateReturnDate].join("-");

  const [returnDate, setReturnDate] = useState(minReturnDate);

  // Function definition

  const handleRoundTrip = () => {
    setTripType("round_trip");
  };

  const handleOneWay = () => {
    setTripType("one_way");
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
                  value={tripType === "one_way"}
                />
                <RadioButton
                  id="tripChoice2"
                  name="trip"
                  label="Round trip"
                  onChange={handleRoundTrip}
                  value={tripType === "round_trip"}
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
                    className="input rounded-[4px] border-[#cccccc] border text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  />
                </div>
              </div>
              <div
                className={`flex flex-col sm:w-[170px] w-full ${
                  tripType === "one_way"
                    ? "hidden sm:block sm:invisible"
                    : "visible"
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
                    disabled={tripType === "one_way"}
                    className="input rounded-[4px] border-[#cccccc] border text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:w-[200px] w-full">
                <label className="font-semibold">Seat Class</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SeatIcon />
                  </div>
                  <select className="input rounded-[4px] border-[#cccccc] border text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5">
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

export default Home;

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 "
    >
      <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
      <path
        fillRule="evenodd"
        d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SeatIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      width="24"
      fill="currentColor"
    >
      <path d="M14 13q-.825 0-1.412-.588Q12 11.825 12 11V6q0-.825.588-1.412Q13.175 4 14 4h2q.825 0 1.413.588Q18 5.175 18 6v5q0 .825-.587 1.412Q16.825 13 16 13Zm0-2h2V6h-2v5Zm-4.5 7q-.675 0-1.2-.387-.525-.388-.725-1.038L5 8V4h2v4l2.5 8H18v2ZM8 21v-2h10v2Zm6-15h2-2Z" />
    </svg>
  );
}

function RadioButton({ label, value, onChange, id, name }) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="radio"
        id={id}
        name={name}
        checked={value}
        onChange={onChange}
        className="radio"
      />
      <label className="font-semibold cursor-pointer" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
