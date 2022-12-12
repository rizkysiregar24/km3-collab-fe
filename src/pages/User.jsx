import React, { useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import { AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import Navbar from "../components/Layout/Navbar";

function User() {
  const [formData, setFormData] = useState({
    fullname: "",
    phonenumber: "",
    emergencynumber: "",
    gender: "",
    month: "",
    day: "",
    year: "",
  });

  const onChangeHandler = (event) => {
    if (event.target.name === "languages") {
      const copy = { ...formData };

      if (event.target.checked) {
        copy.languages.push(event.target.value);
      } else {
        copy.languages = copy.languages.filter((el) => el !== event.target.value);
      }

      setFormData(copy);
    } else {
      setFormData(() => ({
        ...formData,
        [event.target.name]: event.target.value,
      }));
    }
  };

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
                <label htmlFor="fullname">Full Name</label>
                <div className="relative flex ">
                  <input
                    id="fullname"
                    type="text"
                    name="fullname"
                    className="px-20 border w-full rounded focus:outline-0  py-1 border-slate-500 required:red-border-500"
                    placeholder="Full Name"
                    onChange={onChangeHandler}
                    value={formData.fullname}
                    required
                  />
                  <div className="absolute bg-[#7E56DA] rounded text-white h-full w-16 ">
                    <AiOutlineUser className=" mx-5 mt-2" size={20} />
                  </div>
                </div>
              </div>
              <div className="form-group flex flex-col mt-5">
                <label htmlFor="phonenumber">Phone Number</label>
                <div className="relative flex ">
                  <input
                    id="phonenumber"
                    type="text"
                    name="phonenumber"
                    className="px-20 border w-full rounded focus:outline-0  py-1 border-slate-500 required:red-border-500"
                    placeholder="Phone Number"
                    onChange={onChangeHandler}
                    value={formData.phonenumber}
                    required
                  />
                  <div className="absolute bg-[#7E56DA] rounded text-white h-full w-16 ">
                    <AiOutlinePhone className=" mx-5 mt-2" size={20} />
                  </div>
                </div>
              </div>
              <div className="form-group flex flex-col mt-5">
                <label htmlFor="emergencynumber">Emergency Number</label>
                <div className="relative flex ">
                  <input
                    id="emergencynumber"
                    type="text"
                    name="emergencynumber"
                    className="px-20 border w-full rounded focus:outline-0  py-1 border-slate-500 required:red-border-500"
                    placeholder="Emergency Number"
                    onChange={onChangeHandler}
                    value={formData.emergencynumber}
                    required
                  />
                  <div className="absolute bg-[#7E56DA] rounded text-white h-full w-16 ">
                    <BiPhoneCall className=" mx-5 mt-2" size={20} />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group mt-5">
              <h1 className="font-bold text-2xl">Gender</h1>
              <fieldset className="flex flex-col gap-2">
                <div className="flex">
                  <div className="mt-1">
                    <input type="radio" name="gender" value="male" onChange={onChangeHandler} checked={formData.gender === "male"} />
                    <label htmlFor="male" className="ml-1">
                      Male
                    </label>
                  </div>
                  <div className="ml-10 mt-1">
                    <input type="radio" name="gender" value="female" onChange={onChangeHandler} checked={formData.gender === "female"} />
                    <label htmlFor="female" className="ml-1">
                      Female
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-2xl">Date of Birth</h1>
              <div className="flex flex-col gap-3 lg:flex-row">
                <div className="form-group flex flex-col">
                  <label htmlFor="month">Month</label>
                  <input id="month" type="text" name="month" className="border focus:outline-0 rounded px-2 py-1 border-slate-500 required:red-border-500" placeholder="MM" onChange={onChangeHandler} value={formData.month} required />
                </div>
                <div className="form-group flex flex-col">
                  <label htmlFor="day">Day</label>
                  <input id="day" type="text" name="day" className="border focus:outline-0 rounded px-2 py-1 border-slate-500" placeholder="DD" onChange={onChangeHandler} value={formData.day} />
                </div>
                <div className="form-group flex flex-col">
                  <label htmlFor="year">Year</label>
                  <input id="year" type="text" name="year" className="border focus:outline-0 rounded px-2 py-1 border-slate-500 required:red-border-500" placeholder="YYYY" onChange={onChangeHandler} value={formData.year} required />
                </div>
              </div>
            </div>

            <div className="form-group mt-5">
              <button className="w-full sm:w-auto font-semibold inline-flex items-center justify-center md:justify-start btn btn-primary bg-brand hover:bg-brand-hover" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User;
