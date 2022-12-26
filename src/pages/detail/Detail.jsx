import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Detail() {
  const [detail, setDetail] = useState([]);
  const API_URL = process.env.REACT_APP_AUTH_API;
  const { id } = useParams();

  useEffect(() => {
    const config = {
      method: 'get',
      url: `${API_URL}/admin/data/${id}`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    };
    axios(config)
      .then((response) => {
        setDetail(response.data.data.detail_user);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>{detail.id}</div>
      <div>{detail.address}</div>
    </>
    // <tbody>
    //   {detail?.map((x) => (
    //     <tr
    //       key={x.id}
    //       className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    //       <th
    //         scope="row"
    //         className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    //         {x.username}
    //       </th>
    //       <td className="py-4 px-6">{x.email}</td>
    //       <td className="py-4 px-6">{x.createdAt}</td>
    //       <td className="py-4 px-6">{x.updatedAt}</td>
    //     </tr>
    //   ))}
    // </tbody>
  );
}
