import React from "react";
import { useSearchParams } from "react-router-dom";

import { Layout } from "../../components/Layout";

export function SearchResult() {
  const [searchParams] = useSearchParams();

  const departure = searchParams.get("from");
  const arrival = searchParams.get("to");
  const passengers = searchParams.get("passengers");
  const tripType = searchParams.get("tripType");
  const seatClass = searchParams.get("sc");
  const fromDate = searchParams.get("fromDate");
  const returnDate = searchParams.get("returnDate");

  return (
    <Layout>
      <div className="h-screen text-center">
        <h1>Search Result for</h1>
        <p>Departure = {departure}</p>
        <p>Arrival = {arrival}</p>
        <p>Passengers = {passengers.split(".").toString()}</p>
        <p>Trip type = {tripType}</p>
        <p>Seat class = {seatClass}</p>
        <p>From Date = {fromDate}</p>
        <p>Return Date = {returnDate}</p>

        <br />
        <br />
        <br />

        <h2>Sample</h2>
        <p>
          {departure} -&gt; {arrival}
        </p>
        <p>{new Date(fromDate).toString()}</p>
        <p>{seatClass}</p>
        <p>{}</p>
      </div>
    </Layout>
  );
}
