import React from "react";
// import { useSearchParams } from "react-router-dom";

import { ExpediaCard } from "../../components/Cards";
import { Layout } from "../../components/Layout";

export function SearchResult() {
  // const [searchParams] = useSearchParams();

  // const departure = searchParams.get("from");
  // const arrival = searchParams.get("to");
  // const passengers = searchParams.get("passengers");
  // const tripType = searchParams.get("tripType");
  // const seatClass = searchParams.get("sc");
  // const fromDate = searchParams.get("fromDate");
  // const returnDate = searchParams.get("returnDate");

  return (
    <Layout>
      <div className="w-full mx-auto">
        <div className="flex justify-center my-8">
          <div className="flex justify-center items-center max-w-3xl flex-col gap-4 mx-4">
            <ExpediaCard />
            <ExpediaCard />
            <ExpediaCard />
            <ExpediaCard />
            <ExpediaCard />
            <ExpediaCard />
            <ExpediaCard />
            <ExpediaCard />
            <ExpediaCard />
            <ExpediaCard />
            <ExpediaCard />
            <ExpediaCard />
          </div>
        </div>
      </div>
    </Layout>
  );
}
