/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BiTimeFive } from 'react-icons/bi';
import { TbPlaneDeparture, TbPlaneArrival } from 'react-icons/tb';

import { Button } from '../../components/Input';
import { Layout } from '../../components/Layout';

const API_URL = process.env.REACT_APP_AUTH_API;

export function Booking() {
  const [data, setData] = useState([]);
  const [ticketData, setTicketData] = useState(null);

  const [searchParams] = useSearchParams();
  const passengers = searchParams.get('passengers');
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    airlineName,
    departureAirport,
    arrivalAirport,
    departure,
    arrival,
    departureTime,
    price
  } = ticketData ?? {};

  const handleTransaction = async () => {
    try {
      const { data: transactionData, status: transactionStatus } = await axios.post(
        `${API_URL}/transaction`,
        {
          flight_id: Number(id),
          passenger: data
        },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );

      const paymentCode = await transactionData.data.transaction.payment_code;

      if (transactionStatus === 200 && paymentCode) {
        navigate(`/payment/${paymentCode}`);
      }

      return null;
    } catch (error) {
      toast(JSON.stringify(error));
    }
    return null;
  };

  const handleChange = (index, name, value) => {
    const newData = data.map((d, i) => {
      if (index === i) {
        return { ...d, [name]: value };
      }
      return d;
    });
    setData(newData);
  };

  useEffect(() => {
    (async () => {
      const { data: ticketResponse } = await axios.get(`${API_URL}/flight/data/${id}`);
      setTicketData(ticketResponse?.data);
    })();
  }, []);

  useEffect(() => {
    if (Number(passengers) > 0) {
      const passengerData = {
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        type: 'adult'
      };
      const passengersData = [];
      Array.from({ length: passengers }, () => {
        passengersData.push(passengerData);
      });
      setData(passengersData);
    }
  }, [passengers]);

  return (
    <Layout>
      <div className="flex justify-center my-4">
        <ul className="steps">
          <li className="step step-primary">Book</li>
          <li className="step">Pay</li>
          <li className="step">E-ticket</li>
        </ul>
      </div>
      <div className="flex justify-around flex-wrap flex-col-reverse md:flex-row">
        <div className="flex flex-col flex-wrap">
          {data.length > 0 &&
            data.map((v, i) => (
              <div className="p-8" key={i}>
                <h1>Detail Passenger {i + 1}</h1>
                <form>
                  <label htmlFor="email" className="flex flex-col">
                    Email
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="johndoe@mail.com"
                      className="input input-primary w-full"
                      onChange={(e) => {
                        handleChange(i, e.target.name, e.target.value);
                      }}
                      value={data[i]?.email}
                    />
                  </label>
                  <label htmlFor="firstName" className="flex flex-col">
                    Fisrt Name
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      className="input input-primary"
                      onChange={(e) => {
                        handleChange(i, e.target.name, e.target.value);
                      }}
                      value={data[i]?.firstName}
                    />
                  </label>
                  <label htmlFor="lastName" className="flex flex-col">
                    Last Name
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      className="input input-primary"
                      onChange={(e) => {
                        handleChange(i, e.target.name, e.target.value);
                      }}
                      value={data[i]?.lastName}
                    />
                  </label>
                  <label htmlFor="phone" className="flex flex-col">
                    Phone number
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="081000100101"
                      className="input input-primary"
                      onChange={(e) => {
                        handleChange(i, e.target.name, e.target.value);
                      }}
                      value={data[i]?.phone}
                    />
                  </label>
                  <label htmlFor="type" className="flex flex-col">
                    Passenger type
                    <select
                      name="type"
                      id="type"
                      className="select select-primary w-full max-w-xs"
                      onChange={(e) => {
                        handleChange(i, e.target.name, e.target.value);
                      }}
                      value={data[i]?.type}>
                      <option value="adult">Adult</option>
                      <option value="child">Child</option>
                    </select>
                  </label>
                </form>
              </div>
            ))}
          <Button className="mt-4" onClick={handleTransaction}>
            Proceed to payment
          </Button>
        </div>

        <div className="p-8 flex flex-col gap-3 bg-slate-100 h-min rounded-md m-4">
          <h2 className="font-semibold text-2xl">Flight Detail</h2>
          <p className="font-semibold">
            {departureAirport} &rarr; {arrivalAirport}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-semibold flex-wrap">
              <TbPlaneDeparture /> {departure} &rarr;
              <TbPlaneArrival /> {arrival}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BiTimeFive />
            <p>{departureTime}</p>
          </div>
          <p className="text-lg">{airlineName}</p>
          <p className="text-xl">
            Total Price{' '}
            <span className="font-semibold">
              Rp.{' '}
              {passengers
                ? new Intl.NumberFormat('ID-id').format(passengers * price ?? 0)
                : new Intl.NumberFormat('ID-id').format(price ?? 0)}
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
}

// import React, { useState } from 'react';

// export function Booking() {
//   // Declare a state variable called "items" with an initial value of an empty array
//   const [items, setItems] = useState([]);

//   // Function to add a new item to the array
//   const addItem = () => {
//     setItems([...items, { id: items.length, value: Math.random() }]);
//   };

//   return (
//     <div>
//       {JSON.stringify(items)}
//       <button onClick={addItem} type="button">
//         Add item
//       </button>
//       {items.map((item) => (
//         <div key={item.id}>{item.value}</div>
//       ))}
//     </div>
//   );
// }

// import React, { useState } from 'react';

// export function Booking() {
//   // Declare a state variable called "data" with an initial value of an empty array
//   const [data, setData] = useState([]);

//   // Function to handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Get the form values
//     const name = event.target.elements.name.value;
//     const address = event.target.elements.address.value;

//     // Add the new item to the array
//     setData([...data, { name, address }]);
//   };

//   return (
//     <div>
//       {JSON.stringify(data)}
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input type="text" name="name" />
//         </label>
//         <br />
//         <label>
//           Address:
//           <input type="text" name="address" />
//         </label>
//         <br />
//         <button type="submit">Submit</button>
//         {data.map((item) => (
//           <div key={item.name}>
//             Name: {item.name}
//             <br />
//             Address: {item.address}
//           </div>
//         ))}
//       </form>
//     </div>
//   );
// }
