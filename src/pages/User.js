import "./User.css";
import { useState } from "react";

function User() {
  const [formData, setFormData] = useState({
    fullname: "",
    phonenumber: "",
    emergencycontact: "",
    gender: "",
    birthday: "",
  });

  const onChangeHandler = (event) => {
    console.log(event);
    if (event.target.name === "languages") {
      let copy = { ...formData };

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
    console.log(formData);
  };
  return (
    <div className="App">
      <form onSubmit={onSubmitHandler}>
        <h1>Person Detail</h1>
        <div className="form-group">
          <label htmlFor="fullname" className="form-label">
            Full Name
          </label>
          <input className="form-control" name="fullname" onChange={onChangeHandler} value={formData.fullname} />
        </div>
        <div className="form-group">
          <label htmlFor="phonenumber" className="form-label">
            Phone Number
          </label>
          <input className="form-control" name="phonenumber" onChange={onChangeHandler} value={formData.phonenumber} />
        </div>
        <div className="form-group">
          <label htmlFor="emergencycontact" className="form-label">
            Emergency Contact
          </label>
          <input className="form-control" name="emergencycontact" onChange={onChangeHandler} value={formData.emergencycontact} />
        </div>
        <div className="form-group">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <div>
            <div>
              <input type="radio" name="gender" value="male" onChange={onChangeHandler} checked={formData.gender === "male"} />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input type="radio" name="gender" value="female" onChange={onChangeHandler} checked={formData.gender === "female"} />
              <label htmlFor="female">Female</label>
            </div>
            <div>
              <input type="radio" name="gender" value="other" onChange={onChangeHandler} checked={formData.gender === "other"} />
              <label htmlFor="other">Other</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="birthday" className="form-label">
            Day of Birth
          </label>
        </div>
        <input type="date" required className="form-control" />
        <div className="form-group">
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default User;
