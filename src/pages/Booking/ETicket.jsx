import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import axios from 'axios';
import { toPng } from 'html-to-image';

import { Layout } from '../../components/Layout';
import Logo from '../../components/Icons/Logo';
import { getAirlineLogo } from '../../utils/airlines';

const API_URL = process.env.REACT_APP_AUTH_API;

function ETicket() {
  const [ticketData, setTicketData] = useState(null);

  const ref = useRef(null);

  const { detail_transaction: detailTransaction, isPaid } = ticketData ?? {};
  const passengers = detailTransaction ? detailTransaction[0]?.passenger : [];
  const flight = detailTransaction ? detailTransaction[0]?.flight : {};
  const {
    arrival,
    arrivalAirport,
    departure,
    departureAirport,
    date,
    airlineName,
    arrivalTime,
    departureTime,
    sc,
    code
  } = flight ?? {};

  const { paymentId } = useParams();

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        toast(err.message);
      });
  }, [ref]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_URL}/ticket/${paymentId}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      setTicketData(data.data);
    })();
  }, []);

  return (
    <Layout title="E-ticket" className="bg-slate-100">
      <div className="flex justify-center my-4 print:hidden">
        <ul className="steps w-full">
          <li data-content="✓" className="step step-primary">
            Book
          </li>
          <li data-content="✓" className="step step-primary">
            Pay
          </li>
          <li data-content="✓" className="step step-primary">
            E-ticket
          </li>
        </ul>
      </div>
      <div className="mx-4 md:mx-32">
        <h1 className="text-3xl font-bold print:hidden">Your E-ticket has been issued</h1>
        <button type="button" onClick={() => window.print()} className="mr-2">
          Print Ticket
        </button>

        <button type="button" onClick={onButtonClick}>
          Download
        </button>
        <div className="my-8 bg-white p-8 rounded-[4px]" ref={ref}>
          {/* ticket header start */}
          <div className="flex flex-wrap items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold">E-ticket</h1>
              <p>Departure Flight</p>
            </div>
            <Logo />
          </div>
          {/* ticket header end */}
          {/* flight detail start */}
          <div className="flex flex-wrap  gap-4 justify-between mt-8 ">
            <div>
              <img src={getAirlineLogo(airlineName)} alt={airlineName} className="h-8" />
              <p className="font-semibold mt-2">{airlineName}</p>
              <p>{code}</p>
              <p className="capitalize">{sc}</p>
            </div>
            <div className="text-base">
              <p className="mb-3">{new Date(date).toDateString()}</p>
              <div className="flex gap-2">
                <div className="flex flex-col gap-3 justify-between text-xl">
                  <p>{departureTime ? departureTime.substring(0, 5) : ''}</p>
                  <p>{arrivalTime ? arrivalTime.substring(0, 5) : ''}</p>
                </div>
                <div className="flex flex-col gap-2 justify-between items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z"
                      fill="#512BD4"
                    />
                  </svg>
                  <div className="border-l-2 h-4" />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7" stroke="#512BD4" strokeWidth="2" />
                  </svg>
                </div>
                <div className="flex flex-col gap-2 justify-between">
                  <p>
                    {departureAirport}({departure})
                  </p>
                  <p>
                    {arrivalAirport}({arrival})
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold">Terbang Tinggi Booking ID</p>
              <p className="text-sm font-bold mt-2 mb-2">{new Date().getTime()}</p>
              <div className={isPaid ? 'block' : 'hidden'}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM0AAADNCAAAAAA+16u1AAACOUlEQVR42u3aSW7DMBAEQP//08k9iKhuLoZslE5GIlssHQbDHr5+vul60dDQ0NDQ0NDQ0NDQ0NDQrGpe99efmy+/Nv69/36lXwENDc0ZzXXhGP43cF1+Wl4BDQ3Ndk2wovEtN0+/qlDpCmhoaB6qCe4LOhsaGpoP0gQtyngH86iaRkNDk+4ugk/jIjZued68W6OhoemTxsOf3pzc0tDQTIwZw9QzyETT3zs4xaWhoZnMJ/rh57iCVs+loaE5qImThTlhMCOp4hQaGpqdmvFSq6qVTkCrTGW2T6Ohoak0aTkLupMgRJlMTGloaE5rqqo1eQSi73FoaGhOa6o5ZXq+IQgzJt8YDQ3NQU2aPlZxaPoSttc0Ghqa5c6mv6UqdmPNespBQ0OzknIErcfK2ee075mdeNDQ0Kych65WmQajR9obGhqaM5q0T0lHIZPFc3biQUNDs6Lpy9k476jK1JlznTQ0NH3WmRaxah5SPWhncktDQzM590xPOsQjyvtcpHoxNDQ02zXBotMGppqtpu+ThobmLZoqfZw8+JAej96ZddLQ0Kxo0hpUrS04Nrlp7klDQ5OefgiuFXW6ym54QkNDs0dTVZn+NFSwymrPQ0NDc0YTVLJgCelOZ7JG0tDQnNZU9Wbcf6R1Lt3k0NDQPEWThpt9y5POV2hoaB6gqSLNND/pv0tDQ7NdM7lHSacWwfR05+luGhqa3Vln8Lf+NFS6kaKhoTmo+diLhoaGhoaGhoaGhoaGhoamuX4BF2Q4qCKv8vQAAAAASUVORK5C"
                  alt="qr"
                  className="h-24"
                />
              </div>
            </div>
          </div>
          {/* flight detail end */}

          {/* information start */}
          <div className="border-t-2 border-b-2 flex flex-col lg:flex-row justify-between gap-8 my-8 p-8">
            <div className="flex items-center gap-4">
              <IoDocumentTextOutline size={24} />
              <p>Show e-ticket and passengers identity when check-in</p>
            </div>
            <div className="flex items-center gap-4">
              <BiTimeFive size={24} />
              <p>Check-in at least 30 minutes before scheduled departure time</p>
            </div>
            <div className="flex items-center gap-4">
              <AiOutlineInfoCircle size={24} />
              <p>Times shown are local airport time</p>
            </div>
          </div>
          {/* information end */}

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Passenger(s)</th>
                  <th>Route</th>
                </tr>
              </thead>
              <tbody>
                {passengers
                  ? passengers.map((passenger, index) => (
                      <tr key={passenger.id}>
                        <th>{index + 1}</th>
                        <td className="capitalize">{`${passenger.firstName} ${passenger.lastName}`}</td>
                        <td>
                          <div className="badge badge-success text-xs">
                            {departure} - {arrival}
                          </div>
                        </td>
                      </tr>
                    ))
                  : 'Loading...'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ETicket;
