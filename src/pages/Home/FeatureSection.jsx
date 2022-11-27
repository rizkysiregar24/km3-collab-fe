import React from "react";

function FeatureSection() {
  return (
    <div className="container mx-auto my-8">
      <div className="xl:h-[700px] flex flex-col justify-center">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold my-8">Why Terbang Tinggi?</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequatur quaerat quod sed, aliquam sapiente at.
          </p>
        </div>
        <div className="flex justify-center xl:justify-between mx-4 flex-wrap items-center gap-4 flex-col xl:flex-row">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md ">
            <WalletIcon />
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
              Various Payment Methods
            </h5>
            <p className="mb-3 font-normal text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
              adipisci!
            </p>
          </div>
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md ">
            <DollarIcon />
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-">
              No Hidden Fee
            </h5>
            <p className="mb-3 font-normal text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
          </div>
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md">
            <RefundIcon />
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
              Refundable<sup className="text-red-500">*</sup>
            </h5>
            <p className="mb-3 font-normal text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis molestiae
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureSection;

function WalletIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
      />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function RefundIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
      />
    </svg>
  );
}
