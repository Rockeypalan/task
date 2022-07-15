import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();
  const [loggedInUser, setloggedInUser] = useState({
    first_name: "",
    last_name: "",
    city: "",
    state: "",
    email: "",
    age: "",
    web: ""
  });

  const { first_name, last_name, city, state, email, age, web } = loggedInUser;
  const onInputChange = e => {
    setloggedInUser({ ...loggedInUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:3003/users/${id}`, loggedInUser);
    if(loggedInUser){
      toast.success('Updated Successfully')
    }
    history.push(`/users/${loggedInUser.id}`);
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3003/users/${id}`);
    setloggedInUser(result.data);
  };
  return (
    <div className="container">
      <ToastContainer/>
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A User</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control"
              placeholder="Enter Your First Name"
              name="first_name"
              value={first_name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control"
              placeholder="Enter Your Last Name"
              name="last_name"
              value={last_name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control"
              placeholder="Enter Your city Name"
              name="city"
              value={city}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control"
              placeholder="Enter Your State"
              name="state"
              value={state}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control"
              placeholder="Enter Your E-mail Address"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control"
              placeholder="Enter Your Age"
              name="age"
              value={age}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control"
              placeholder="Enter Your Website Name"
              name="website"
              value={web}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-success btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;