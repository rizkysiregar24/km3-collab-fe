import React, { useEffect, useState } from 'react';
import { AiOutlinePhone, AiOutlineUser, AiOutlineMail, AiOutlineGlobal } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { myProfile } from '../../redux/user/user.actions';

import Navbar from '../../components/Layout/Navbar';

function User() {
  const dispatch = useDispatch();

  const {
    name: username,
    email,
    thumbnail,
    fullName,
    gender,
    country,
    province,
    city,
    address,
    phone: nomorhp
  } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    fullName,
    phone: nomorhp,
    email,
    gender,
    country,
    thumbnail,
    province,
    city,
    address,
    name: username
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    dispatch(myProfile());
  }, []);

  useEffect(() => {
    setFormData({
      fullName,
      phone: nomorhp,
      email,
      gender,
      country,
      thumbnail,
      province,
      city,
      address,
      name: username
    });
  }, [username, email, thumbnail, fullName, gender, country, province, city, address, nomorhp]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="mx-auto ">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center  md:py-10  px-5">
          <form className="w-full" onSubmit={onSubmitHandler}>
            <div>
              <h1 className="font-bold text-2xl">Person Detail</h1>
              <div className="form-group flex flex-col mt-5">
                <label htmlFor="fullname">Username</label>
                <div className="relative flex ">
                  <input
                    id="Username"
                    type="text"
                    name="name"
                    className="px-20 border w-full rounded focus:outline-0  py-1 border-slate-500 required:red-border-500"
                    placeholder="Full Name"
                    onChange={handleChange}
                    value={formData.name}
                  />
                  <div className="absolute bg-[#7E56DA] rounded text-white h-full w-16 ">
                    <AiOutlineUser className=" mx-5 mt-2" size={20} />
                  </div>
                </div>
              </div>

              <div className="form-group flex flex-col mt-5">
                <label htmlFor="emergencynumber">Email</label>
                <div className="relative flex ">
                  <input
                    id="email"
                    type="text"
                    name="email"
                    className="px-20 border w-full rounded focus:outline-0  py-1 border-slate-500 required:red-border-500"
                    placeholder="Emergency Number"
                    onChange={handleChange}
                    value={formData.email}
                  />
                  <div className="absolute bg-[#7E56DA] rounded text-white h-full w-16 ">
                    <AiOutlineMail className=" mx-5 mt-2" size={20} />
                  </div>
                </div>
              </div>
              <div className="form-group flex flex-col mt-5">
                <label htmlFor="phone">Phone Number</label>
                <div className="relative flex ">
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    className="px-20 border w-full rounded focus:outline-0  py-1 border-slate-500 required:red-border-500"
                    placeholder={formData.phone}
                    onChange={handleChange}
                    value={formData.phone}
                  />
                  <div className="absolute bg-[#7E56DA] rounded text-white h-full w-16 ">
                    <AiOutlinePhone className=" mx-5 mt-2" size={20} />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group flex flex-col mt-5">
              <label htmlFor="emergencynumber">country</label>
              <div className="relative flex ">
                <input
                  id="country"
                  type="text"
                  name="country"
                  className="px-20 border w-full rounded focus:outline-0  py-1 border-slate-500 required:red-border-500"
                  placeholder="country"
                  onChange={handleChange}
                  value={formData.country}
                  required
                />
                <div className="absolute bg-[#7E56DA] rounded text-white h-full w-16 ">
                  <AiOutlineGlobal className=" mx-5 mt-2" size={20} />
                </div>
              </div>
            </div>

            <div className="form-group mt-5">
              <h1 className="font-bold text-2xl">Gender</h1>
              <fieldset className="flex flex-col gap-2">
                <div className="flex">
                  <div className="mt-1">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      onChange={handleChange}
                      checked={formData.gender === 'Male'}
                    />
                    <label htmlFor="male" className="ml-1">
                      Male
                    </label>
                  </div>
                  <div className="ml-10 mt-1">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      onChange={handleChange}
                      checked={formData.gender === 'Female'}
                    />
                    <label htmlFor="female" className="ml-1">
                      Female
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User;
