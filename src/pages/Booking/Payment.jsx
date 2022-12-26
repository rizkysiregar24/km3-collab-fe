/* eslint-disable no-unsafe-optional-chaining */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import useValidUser from '../../hooks/useValidUser';
import { Layout } from '../../components/Layout';
import { Button } from '../../components/Input';
import { getAirlineLogo } from '../../utils/airlines';
import CustomModal from '../../components/Modal/CustomModal';

const API_URL = process.env.REACT_APP_AUTH_API;

function Payment() {
  const [ticketData, setTicketData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { paymentId } = useParams();
  const navigate = useNavigate();
  const isValidUser = useValidUser();

  const { isPaid, detail_transaction: detailTransaction, total } = ticketData ?? {};
  const passengers = detailTransaction ? detailTransaction[0]?.passenger : [];
  const {
    price,
    tripType,
    sc,
    arrivalAirport,
    departureAirport,
    date,
    arrivalTime,
    departureTime,
    airlineName
  } = detailTransaction ? detailTransaction[0]?.flight : 0;

  const handlePayment = async () => {
    try {
      const { data, status } = await axios.post(
        `${API_URL}/ticket/${paymentId}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );

      if (status === 200) {
        toast('Payment successfull, grab your ticket now', {
          type: 'success'
        });
        navigate(`/eticket/${paymentId}`);
      }
      toast(data.message, { type: 'success' });
    } catch (error) {
      toast(error.message, { type: 'error' });
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_URL}/ticket/${paymentId}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      if (data.data.isPaid) {
        navigate(`/eticket/${paymentId}`);
      }
      setTicketData(data.data);
    })();
  }, []);

  if (!isValidUser) {
    navigate('/login');
  }

  return (
    <Layout title="Payment">
      <div className="flex justify-center my-4">
        <ul className="steps w-full">
          <li data-content="✓" className="step step-primary">
            Book
          </li>
          <li className="step step-primary">Pay</li>
          <li className="step">E-ticket</li>
        </ul>
      </div>
      <div className="flex flex-col gap-4 m-4 md:mx-44">
        <div className="self-start mb-2 md:mb-4">
          <div className="flex flex-wrap gap-4 font-normal text-sm mb-2 md:mb-4">
            <p className="capitalize">{sc}</p> &bull;
            <p className="capitalize">{tripType ? tripType.split('_').join(' ') : ''}</p> &bull;
            <p>{new Date(date).toDateString()}</p>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {departureAirport} &rarr; {arrivalAirport}
            </h1>
          </div>
        </div>
        <h2 className="text-xl md:text-2xl self-start font-semibold">Check and pay</h2>
        {/* Flight detail */}
        <div className="flex items-center gap-4 border p-4 rounded-[4px]">
          <img
            src={getAirlineLogo(airlineName)}
            alt={airlineName}
            className="h-12"
            title={airlineName}
          />
          <div className="text-sm flex flex-col gap-2">
            <p className="font-semibold">Flight to {arrivalAirport}</p>
            <p>
              {departureTime ? departureTime.substring(0, 5) : ''} -{' '}
              {arrivalTime ? arrivalTime.substring(0, 5) : ''}
            </p>
            <p className="capitalize">{sc}</p>
          </div>
        </div>
        {/* Traveler Detail */}
        <div className="border p-4 rounded-[4px]">
          <h3 className="text-lg font-semibold mb-2">Traveler details</h3>
          <div className="text-sm flex flex-col gap-2">
            {passengers
              ? passengers.map((x, i) => (
                  <div key={x.id}>
                    <p className="capitalize font-medium">
                      <span className="font-bold">{i + 1}. </span>
                      {x.firstName} {x.lastName} - {x.type}
                    </p>
                  </div>
                ))
              : 'Loading...'}
          </div>
        </div>
        {/* Price detail */}
        <div className="border p-4 rounded-[4px]">
          <h3 className="text-lg font-semibold mb-2">Fare details</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p>Ticket ({total})</p>
              <p className="font-semibold">
                {`IDR${new Intl.NumberFormat('ID-id').format(price * total)}`}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Platform service fee</p>
              <p className="font-semibold">
                {`IDR${new Intl.NumberFormat('ID-id').format(15000)}`}
              </p>
            </div>
            <div className="flex justify-between font-semibold text-xl border-t-2 border-gray-300">
              <p>Total</p>
              <p>{`IDR${new Intl.NumberFormat('ID-id').format(15000 + price * total)}`}</p>
            </div>
          </div>
        </div>
        <div className="mx-auto">
          <Button className={`max-w-xs ${isPaid ? 'hidden' : 'block'}`} onClick={openModal}>
            Confirm Payment
          </Button>
          <div
            className={`max-w-xs ${
              !isPaid ? 'hidden' : 'block'
            } bg-info text-black font-bold px-4 py-2 rounded-[4px]`}>
            Paid, get your e-ticket now
          </div>
          <CustomModal isOpen={isOpen} closeModal={closeModal} label="Payment confirmation">
            <div className="flex flex-col items-center justify-center gap-4">
              <h2 className="font-bold text-xl">Confirm this payment?</h2>
              <p>This action cannot be canceled</p>
              <div className="flex gap-4">
                <button type="button" className="btn btn-outline" onClick={closeModal}>
                  Cancel
                </button>
                <Button className="w-[120px]" onClick={handlePayment}>
                  Confirm
                </Button>
              </div>
            </div>
          </CustomModal>
        </div>
      </div>
    </Layout>
  );
}

export default Payment;
