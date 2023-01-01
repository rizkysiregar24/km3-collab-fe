import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useParams } from 'react-router-dom';

import Navbar from '../../components/Layout/Navbar';

export default function DetailTransaction() {
  const API_URL = process.env.REACT_APP_AUTH_API;
  const [detail, setDetail] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const config = {
      method: 'get',
      url: `${API_URL}/transaction/${id}`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    };
    axios(config)
      .then((response) => {
        setDetail(response.data.data.detail_transaction[0]);
      })
      .catch((error) => {
        toast(error);
      });
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className=" ">
        <h1 className="text-2xl text-center py-5 font-serif">Detail History Transaction</h1>
        <table className="w-full  text-sm text-left  text-gray-500 dark:text-gray-400 ">
          <tbody className="grid place-content-center">
            {detail.passenger?.map((x) => (
              <div className="my-5 ">
                <tr className="bg-white dark:bg-gray-800 ">
                  <th
                    scope="row"
                    className="py-4 px-6 flex font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <p className="mt-1">Email</p>
                  </th>
                  <td className="py-4 px-6">{x.email}</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    First Name
                  </th>
                  <td className="py-4 px-6">{x.firstName}</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Last Name
                  </th>
                  <td className="py-4 px-6">{x.lastName}</td>
                </tr>
                <tr className="bg-white  dark:bg-gray-800">
                  <th
                    scope="row"
                    className="py-4 px-6 flex font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Phone Number
                  </th>
                  <td className=" py-4 px-6">{x.phone}</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Type
                  </th>
                  <td className="py-4 px-6">{x.type}</td>
                </tr>
                <br />
                <a href={detail?.tiket[0]?.ticket_pdf} className="ml-5">
                  <span className="font-medium bg-green-500 px-5 text-center py-2 w-40 rounded-lg text-white  hover:underline">
                    Download Tiket
                  </span>
                </a>
              </div>
            ))}
          </tbody>
        </table>
      </div>
    </>

    // <>
    //   <div>
    //     <Navbar />
    //   </div>
    // {/* <div className="  bg-slate-100 ">
    //   <div className=" min-[400px]:px-32  py-10 ">
    //     <h1 className="text-3xl font-bold ">Detail Transaction History </h1>
    //     <div className="flex">
    //       {detail.passenger?.map((x) => (
    //         <div className=" min-[100px]:text-left">
    //           <div className="mt-5 flex">
    //             <div className="w-40 text-left">
    //               <div className="grid text-center min-[100px]:text-left">
    //                 <p>{x.email}</p>
    //                 <h1>first name:{x.firstName}</h1>
    //                 <h1>{x.lastName}</h1>
    //                 <h2>{x.phone}</h2>
    //                 <h3>{x.type}</h3>
    //                 <a
    //                   href={detail?.tiket[0]?.ticket_pdf}
    //                   className="font-medium bg-green-500 px-5 py-2 w-40 rounded-lg text-white  hover:underline">
    //                   Download Tiket
    //                 </a>
    //               </div>
    //             </div>
    //           </div>
    //         </div> */}
    //
    //       {/* </div>
    //     </div>
    //   </div>
    // </> */}
    // );
  );
}