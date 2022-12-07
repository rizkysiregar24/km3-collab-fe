/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { IoMdSwap } from "react-icons/io";

import "./Home.css";
import FeatureSection from "./FeatureSection";
import SeatIcon from "../../components/Icons/SeatIcon";
import SearchIcon from "../../components/Icons/SearchIcon";
import CalendarIcon from "../../components/Icons/CalendarIcon";
import RadioButton from "../../components/Input/RadioButton";
import { Layout } from "../../components/Layout/Layout";

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

export function Home() {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [tripType, setTripType] = useState("one_way");
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [departure, setDeparture] = useState(null);
  const [arrival, setArrival] = useState(null);
  const [seatClass, setSeatClass] = useState("economy");

  const navigate = useNavigate();

  // Get date from startDate and add 1 day
  const minDateReturnDate = new Date(startDate).getDate() + 1;
  const minDateReturn =
    minDateReturnDate.toString().split("").length === 1
      ? `0${minDateReturnDate}`
      : minDateReturnDate;
  // Get array of date year, month, day format
  const arrStartDate = new Date(startDate)
    .toISOString()
    .split("T")[0]
    .split("-");
  // get year and month from arrStartDate
  const [startYear, startMonth] = arrStartDate;
  // Now we get the min return date, so it's gonna be startDate + 1 day
  const minReturnDate = [+startYear, +startMonth, minDateReturn].join("-");

  const [returnDate, setReturnDate] = useState(minReturnDate);

  // Function definition

  const handleSearchFlight = () => {
    navigate(
      `/search?from=${departure.value}&to=${
        arrival.value
      }&passengers=${adult}.${child}&tripType=${tripType}&sc=${seatClass}&fromDate=${startDate}&returnDate=${
        tripType === "one_way" ? "" : returnDate
      }`
    );
  };

  const handleRoundTrip = () => {
    setTripType("round_trip");
  };

  const handleOneWay = () => {
    setTripType("one_way");
  };

  const handleSwapDestination = (e) => {
    e.preventDefault();
    setDeparture(arrival);
    setArrival(departure);
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
    if (adult === 1) {
      return;
    }
    setAdult(adult - 1);
  };

  useEffect(() => {
    document.title = "Terbang Tinggi | Best Price for Flights";
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center object-cover object-center bg-cover bg-no-repeat bg-slate-100 md:py-20 py-8">
        <h1 className="font-bold mx-4 text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-tr from-[#0b6cff] to-[#512bd4] p-2">
          Find best ticket price for your next journey
        </h1>
        <div className="bg-white rounded-md shadow-md shadow-indigo-200 sm:w-auto w-11/12 my-8 p-8">
          <form>
            <fieldset>
              <div className="flex gap-8 items-center flex-wrap">
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
                <button
                  type="button"
                  onClick={handleSwapDestination}
                  title="Swap Airports"
                  className="btn btn-primary text-brand hover:bg-brand-darker-800 btn-sm btn-outline flex items-center gap-2 font-semibold w-full md:w-auto outline-brand border-brand"
                >
                  <IoMdSwap size={24} />
                  <p>Swap Airports</p>
                </button>
              </div>
            </fieldset>
            <div className="flex gap-4 mt-4 flex-wrap flex-col sm:flex-row sm:justify-start justify-center">
              <div className="sm:w-[170px] w-full">
                <label className="font-semibold">From</label>
                <Select
                  options={options}
                  value={departure}
                  onChange={(choice) => setDeparture(choice)}
                  required
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      height: "48px",
                      outline: state.isFocused ? "2px solid #512bd4" : null,
                      outlineOffset: state.isFocused ? "2px" : null,
                      boxShadow: "none",
                      border: "1px solid #cccccc",
                      "&:hover": {
                        border: state.isFocused
                          ? "1px solid #cccccc"
                          : "1px solid #cccccc",
                      },
                    }),
                  }}
                />
              </div>
              <div className="sm:w-[170px] w-full">
                <label className="font-semibold">To</label>
                <Select
                  options={options}
                  value={arrival}
                  onChange={(choice) => setArrival(choice)}
                  required
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      height: "48px",
                      outline: state.isFocused ? "2px solid #512bd4" : null,
                      outlineOffset: state.isFocused ? "2px" : null,
                      boxShadow: "none",
                      border: "1px solid #cccccc",
                      "&:hover": {
                        border: state.isFocused
                          ? "1px solid #cccccc"
                          : "1px solid #cccccc",
                      },
                    }),
                  }}
                />
              </div>
              <div className="sm:w-[200px] w-full">
                <label className="font-semibold">No. of Passengers</label>
                <div className="dropdown sm:w-[200px] w-full cursor-pointer">
                  <p
                    tabIndex={0}
                    className="input input-primary flex items-center border-[#cccccc] border text-gray-900 sm:w-52 w-full rounded-[4px] select-none"
                  >
                    {adult} Adult, {child} Children
                  </p>
                  <div
                    tabIndex={0}
                    className="dropdown-content card card-compact w-64 p-2 bg-white text-black mt-1 rounded-[4px] shadow-md shadow-indigo-200"
                  >
                    <div className="card-body">
                      <div className="flex items-center justify-between">
                        <div>Adult</div>
                        <div className="flex gap-4 items-center">
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={incrementAdultPassenger}
                            type="button"
                          >
                            +
                          </button>
                          {adult}
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={decrementAdultPassenger}
                            type="button"
                          >
                            -
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>Children</div>
                        <div className="flex gap-4 items-center">
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={incrementChildPassenger}
                            type="button"
                          >
                            +
                          </button>
                          {child}
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={decrementChildPassenger}
                            type="button"
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
            <div className="flex gap-4 mt-4 md:mt-8 flex-wrap sm:flex-row flex-col ">
              <div className="flex flex-col sm:w-[170px] w-full">
                <label className="font-semibold">Departure Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <CalendarIcon />
                  </div>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={today}
                    required
                    className="input input-primary rounded-[4px] border-[#cccccc] border text-gray-900 text-sm w-full pl-10 p-2.5 appearance-none inline-flex items-center"
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
                    className="input input-primary rounded-[4px] border-[#cccccc] border text-gray-900 text-sm w-full pl-10 p-2.5 appearance-none inline-flex items-center"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:w-[200px] w-full">
                <label className="font-semibold">Seat Class</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SeatIcon />
                  </div>
                  <select
                    className="input input-primary rounded-[4px] border-[#cccccc] border text-gray-900 text-sm block w-full pl-10 p-2.5 appearance-none"
                    value={seatClass}
                    onChange={(e) => setSeatClass(e.target.value)}
                  >
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
              <button
                className="w-full sm:w-auto font-semibold inline-flex items-center justify-center md:justify-start btn bg-brand hover:bg-brand-darker-800"
                type="button"
                onClick={handleSearchFlight}
                disabled={!departure || !arrival}
              >
                <SearchIcon />
                Search Flights
              </button>
            </div>
          </form>
        </div>
      </div>
      <FeatureSection />
    </Layout>
  );
}
