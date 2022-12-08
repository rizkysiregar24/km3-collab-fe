import React from "react";

export function ExpediaCard() {
  return (
    <div className="flex flex-col justify-center w-full bg-brand-lighter-100 p-4 rounded-lg cursor-pointer">
      <div className="flex justify-between items-start gap-4">
        {/* left content, e.g time, destination, airline name */}
        <div className="text-start flex flex-col gap-2 mb-3">
          <h4 className="font-bold text-lg">11:45am - 10:35am</h4>
          <p className="text-sm max-w-[170px] md:max-w-none">
            Thiruvananthapuram (NRT) - Jakarta (CGK)
          </p>
          <div className="block md:hidden">
            <p className="text-sm">24h 50m (Direct)</p>
          </div>
          <div className="flex gap-2 items-center">
            <img
              src="https://hangnadim.bpbatam.go.id/wp-content/uploads/2021/07/tenant-citilink.png"
              alt="Airplane logo"
              className="rounded-full h-4 w-4"
            />
            <p className="text-base font-bold">Scoot</p>
          </div>
        </div>
        {/* end of left content */}
        {/* mid content, total time travel */}
        <div className="hidden md:block">
          <p>24h 50m (Direct)</p>
        </div>
        {/* end of total time travel */}
        {/* right content, price and info roundtrip or oneway */}
        <div className="text-end">
          <h3 className="font-bold text-xl md:text-2xl">Rp. 412.000</h3>
          <p className="text-xs md:text-sm">One way per traveler</p>
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
  );
}
