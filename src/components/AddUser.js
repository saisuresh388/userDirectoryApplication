import React, { useState } from "react";
import UserDataService from "../services/userService";

const AddUser = () => {
  const initialUserState = {
    // {
    //   "Full Name": "Adolfo Walker",
    //   "Country": "Lebanon",
    //   "Id": 0,
    //   "Date of birth": "2005-10-13T08:15:58.878Z",
    //   "Email": "Austyn.Mueller@bryana.biz",
    //   "Created at": "1992-11-29T05:19:06.775Z"
    // },

    id: null,
    fullName: "",
    country: "",
    dob: "",
    email: "",
    description: "",
    published: false,
  };
  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = () => {
    var data = {
      id: Math.random().toString(),
      fullName: user.fullName,
      description: user.description,
      country: user.country,
      dob: user.dob,
      email: user.email,
    };

    UserDataService.create(data)
      .then((response) => {
        setUser({
          id: response.data.Id,
          fullName: response.data["Full Name"],
          description: response.data.description,
          published: response.data.published,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newUser}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              required
              value={user.fullName}
              onChange={handleInputChange}
              name="fullName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              value={user.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              className="form-control"
              id="country"
              required
              value={user.country}
              onChange={handleInputChange}
              name="country"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date</label>
            <input
              type="text"
              className="form-control"
              id="dob"
              required
              value={user.dob}
              onChange={handleInputChange}
              name="dob"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={user.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveUser} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
