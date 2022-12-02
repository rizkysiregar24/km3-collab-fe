import { useState } from 'react';

import RadioButton from '../components/Input/RadioButton'

function User() {
  const [formData, setFormData] = useState({
    fullname: '',
    phonenumber: '',
    emergencynumber: '',
    gender: '',
    month: '',
    day: '',
    year: '',
  });

  const onChangeHandler = (event) => {
    console.log(event);
    if (event.target.name === 'languages') {
      let copy = { ...formData };

      if (event.target.checked) {
        copy.languages.push(event.target.value);
      } else {
        copy.languages = copy.languages.filter(
          (el) => el !== event.target.value
        );
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
    console.log(formData);
  };
  return (
    <div className="mx-auto">
      <div className="flex flex-col items-center object-cover object-center bg-cover bg-no-repeat bg-slate-100 md:py-20 py-8 px-5">
        <form className="w-full" onSubmit={onSubmitHandler}>
          <div>
            <h1 className="font-bold">Person Detail</h1>
            <div className="form-group flex flex-col">
              <label htmlFor="fullname">Full Name</label>
              <input id="fullname" type="text" name="fullname" className="border rounded px-2 py-1 border-slate-500 required:red-border-500" placeholder="Full Name" onChange={onChangeHandler} value={formData.fullname} required />
            </div>
            <div className="form-group flex flex-col">
              <label htmlFor="phonenumber">Phone Number</label>
              <input id="phonenumber" type="text" name="phonenumber" className="border rounded px-2 py-1 border-slate-500" placeholder="Phone Number" onChange={onChangeHandler} value={formData.phonenumber} />
            </div>
            <div className="form-group flex flex-col">
              <label htmlFor="emergencynumber">Emergency Number</label>
              <input
                id="emergencynumber"
                type="text"
                name="emergencynumber"
                className="border rounded px-2 py-1 border-slate-500 focus:border-red-500 required:red-border-500"
                placeholder="Emergency Number"
                onChange={onChangeHandler}
                value={formData.emergencynumber}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <h1 className="font-bold">Gender</h1>
            <fieldset className="flex flex-col gap-2">
             <div>
            <div>
              <input type="radio" name="gender" value="male" onChange={onChangeHandler} checked={formData.gender === "male"} />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input type="radio" name="gender" value="female" onChange={onChangeHandler} checked={formData.gender === "female"} />
              <label htmlFor="female">Female</label>
            </div>
            </div>
            </fieldset>
          </div>

          <div>
            <h1 className="font-bold">Date of Birth</h1>
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="form-group flex flex-col">
                <label htmlFor="month">Month</label>
                <input id="month" type="text" name="month" className="border rounded px-2 py-1 border-slate-500 required:red-border-500" placeholder="MM" onChange={onChangeHandler} value={formData.month} required />
              </div>
              <div className="form-group flex flex-col">
                <label htmlFor="day">Day</label>
                <input id="day" type="text" name="day" className="border rounded px-2 py-1 border-slate-500" placeholder="DD" onChange={onChangeHandler} value={formData.day} />
              </div>
              <div className="form-group flex flex-col">
                <label htmlFor="year">Year</label>
                <input id="year" type="text" name="year" className="border rounded px-2 py-1 border-slate-500 focus:border-red-500 required:red-border-500" placeholder="YYYY" onChange={onChangeHandler} value={formData.year} required />
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
  );
}

export default User;
