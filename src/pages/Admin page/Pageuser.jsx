import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Pageuser() {
  const [user, setUser] = useState([]);
  const API_URL = process.env.REACT_APP_AUTH_API;

  useEffect(() => {
    const config = {
      method: "get",
      url: `${API_URL}/user/data/`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    axios(config)
      .then((resp) => {
        setUser(resp.data.data.user);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);

  const handleDelete = (id) => {
    const config = {
      method: "delete",
      url: `${API_URL}/user/data/${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    axios(config)
      .then((response) => {
        alert(response.data.message);
        window.location.reload();
      })
      .catch((error) => error);
  };

  return (
    <div className="px-5 mt-10">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg border-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Username
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                CreatedAt
              </th>
              <th scope="col" className="py-3 px-6">
                UpdatedAt
              </th>
              <th scope="col" className="py-3 px-6">
                <span className="sr-only">delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {user.map((x) => (
              <tr
                key={x.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {x.username}
                </th>

                <td className="py-4 px-6">{x.email}</td>
                <td className="py-4 px-6">{x.createdAt}</td>
                <td className="py-4 px-6">{x.updatedAt}</td>
                <td className="py-4 px-6 text-right">
                  <button
                    type="button"
                    href="/#"
                    className="font-medium bg-red-500 px-5 py-2 rounded-lg text-white  hover:underline"
                    onClick={() => {
                      handleDelete(x.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
