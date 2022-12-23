import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCurrentTicket } from '../../redux/user/user.actions';

export function ExpediaCard({
  id,
  airlineName,
  departureAirport,
  arrivalAirport,
  departureIata,
  arrivalIata,
  departureTime,
  arrivalTime,
  sc,
  price,
  tripType,
  passengers,
  query
}) {
  const dispatch = useDispatch();

  return (
    <Link
      onClick={() => {
        dispatch(
          setCurrentTicket({
            id,
            airlineName,
            departureAirport,
            arrivalAirport,
            departureIata,
            arrivalIata,
            departureTime,
            arrivalTime,
            sc,
            price,
            tripType,
            passengers
          })
        );
      }}
      to={`/booking/${id}?${query}`}
      // set current ticket to localStorage or Redux store for booking information
      className="flex flex-col justify-center w-full bg-brand-lighter-100 p-4 rounded-lg cursor-pointer">
      <div className="flex justify-between items-start gap-4 md:gap-16">
        {/* left content, e.g time, destination, airline name */}
        <div className="text-start flex flex-col gap-2 mb-3">
          <h4 className="font-bold text-lg">
            {departureTime} - {arrivalTime}
          </h4>
          <p className="text-sm max-w-[170px] md:max-w-none">
            {departureAirport} ({departureIata}) - {arrivalAirport} ({arrivalIata})
          </p>
          <div className="hidden md:hidden">
            <p className="text-sm">24h 50m (Direct)</p>
          </div>
          <div className="flex gap-2 items-center">
            <img
              src="https://hangnadim.bpbatam.go.id/wp-content/uploads/2021/07/tenant-citilink.png"
              alt="Airplane logo"
              className="rounded-full h-4 w-4"
            />
            <p className="text-base font-bold">{airlineName}</p>
          </div>
        </div>
        {/* end of left content */}
        {/* mid content, total time travel */}
        <div className="hidden md:hidden">
          <p>24h 50m (Direct)</p>
        </div>
        {/* end of total time travel */}
        {/* right content, price and info roundtrip or oneway */}
        <div className="text-end">
          <h3 className="font-bold text-xl md:text-2xl">
            Rp. {new Intl.NumberFormat('ID-id').format(price)}
          </h3>
          <p className="text-xs md:text-sm capitalize">{tripType} per traveler</p>
          <p className="capitalize">{sc}</p>
        </div>
        {/* end of right content */}
      </div>
      {/* card footer */}
      <div className="border-t-blue-500 border-t-2 flex">
        <p className="my-2 text-sm md:text-base">Carry-on Included, Refundable, Flexible</p>
      </div>
      {/* end of card footer */}
    </Link>
  );
}
