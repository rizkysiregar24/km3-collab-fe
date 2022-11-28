import React, { useState } from "react";
import Select from "react-select";

import "./Home.css";
import Navbar from "../../components/Navbar";
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

  return (
    <div className=" mx-auto">
      <Navbar />
      {/* Hero Section Start */}
      <div className="flex flex-col justify-center items-center object-cover object-center bg-cover bg-no-repeat bg-slate-200 py-24">
        {/* <div className="flex justify-center items-center object-cover object-center bg-cover bg-no-repeat sm:bg-[url(https://res.cloudinary.com/dmgrxm78p/image/upload/v1669166478/terbangtinggi/hero-image-1.jpg)] bg-blue-600 h-screen"> */}
        <h1 className="text-4xl font-bold text-start mx-4">
          Find best ticket price for your next journey
        </h1>
        <div className="bg-slate-50 rounded-md shadow-md sm:w-auto w-11/12 my-8 p-8">
          <form>
            <fieldset>
              <div className="flex gap-8">
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    id="tripChoice1"
                    name="trip"
                    value="oneway"
                    defaultChecked
                  />
                  <label className="font-semibold" htmlFor="tripChoice1">
                    One way
                  </label>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    id="tripChoice2"
                    name="trip"
                    value="roundtrip"
                  />
                  <label className="font-semibold" htmlFor="tripChoice2">
                    Round trip
                  </label>
                </div>
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
                <Select options={options} />
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
                    className="rounded-[4px] border-[#cccccc] bg-gray-50 border text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:w-[170px] w-full">
                <label className="font-semibold">Return Date</label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer">
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
                    className="rounded-[4px] border-[#cccccc] bg-gray-50 border text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:w-[200px] w-full">
                <label className="font-semibold">Seat Class</label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SeatIcon />
                  </div>
                  <select className="rounded-[4px] border-[#cccccc] bg-gray-50 border text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5">
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
              <button className="py-2 px-4 rounded-[4px] w-full sm:w-auto bg-[#7E56DA] text-white hover:bg-[#7348da] font-semibold text-center inline-flex items-center">
                <SearchIcon />
                Search Flights
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Hero Section End  */}
      <FeatureSection />
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
      className="w-6 h-6"
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
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
      <path d="M14 13q-.825 0-1.412-.588Q12 11.825 12 11V6q0-.825.588-1.412Q13.175 4 14 4h2q.825 0 1.413.588Q18 5.175 18 6v5q0 .825-.587 1.412Q16.825 13 16 13Zm0-2h2V6h-2v5Zm-4.5 7q-.675 0-1.2-.387-.525-.388-.725-1.038L5 8V4h2v4l2.5 8H18v2ZM8 21v-2h10v2Zm6-15h2-2Z" />
    </svg>
  );
}
