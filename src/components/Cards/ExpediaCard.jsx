import React from "react";

export function ExpediaCard({
  airline,
  departureAirport,
  arrivalAirport,
  departureIata,
  arrivalIata,
  departureTime,
  arrivalTime,
  sc,
  price,
  tripType,
}) {
  return (
    <>
      <label htmlFor="my-modal">
        <div className="flex flex-col justify-center w-full bg-brand-lighter-100 p-4 rounded-lg cursor-pointer">
          <div className="flex justify-between items-start gap-4 md:gap-16">
            {/* left content, e.g time, destination, airline name */}
            <div className="text-start flex flex-col gap-2 mb-3">
              <h4 className="font-bold text-lg">
                {departureTime} - {arrivalTime}
              </h4>
              <p className="text-sm max-w-[170px] md:max-w-none">
                {departureAirport} ({departureIata}) - {arrivalAirport} (
                {arrivalIata})
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
                <p className="text-base font-bold">{airline}</p>
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
                Rp. {new Intl.NumberFormat("ID-id").format(price)}
              </h3>
              <p className="text-xs md:text-sm capitalize">
                {tripType} per traveler
              </p>
              <p className="capitalize">{sc}</p>
            </div>
            {/* end of right content */}
          </div>
          {/* card footer */}
          <div className="border-t-blue-500 border-t-2 flex">
            <p className="my-2 text-sm md:text-base">
              Carry-on Included, Refundable, Flexible
            </p>
          </div>
          {/* end of card footer */}
        </div>
      </label>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <label htmlFor="my-modal" className="modal cursor-pointer">
        <label className="modal-box relative w-3/5 max-w-5xl" htmlFor="">
          <h3 className="text-lg font-bold">Flight Details</h3>
          <div className="flex justify-between">
            <div>
              <p>{airline}</p>
              <p>{departureIata}</p>
              <p>{departureAirport}</p>
              <p>{departureTime}</p>
              <p>{arrivalIata}</p>
              <p>{arrivalAirport}</p>
              <p>{arrivalTime}</p>
            </div>
            <div>
              <p>{sc}</p>
              <p>{price}</p>
              <p>{tripType}</p>
            </div>
          </div>
        </label>
      </label>
    </>
  );
}
