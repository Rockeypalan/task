import React, { useState } from "react";
import axios from 'axios'
import { useHistory, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  let history = useHistory();

  //const [error, setError] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    city: "",
    state: "",
    email: "",
    age: "",
    web: ""
  });

  const { first_name, last_name, city, state, email, age, web} = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //const api = "http://localhost:3005/users";

  const onSubmit = async e => {
    e.preventDefault();
    if(!user.first_name, !user.last_name, !user.city, !user.state, !user.email, !user.age, !user.web){
      toast.error('Enter all the fields');
    }else{
      await axios.post(`http://localhost:3003/users`, user)
    .then((response) => {
      console.log("response", response);
      localStorage.setItem(
        "login",
        JSON.stringify({
          userLogin: true,
          token: response.data.access_token,
        })
      );
      //setError("");
      setUser("");
      //setLogoutUser(false);
      history.push("/users");
    })
    //.catch((error) => setError(error.response.data.message));
  }
  };
  return (
    <div className="row mt-3 ">
      <ToastContainer/>
      <div className="col-sm-12 col-md-4 mx-auto shadow p-3 border">
        <h2 className="text-center mb-4">Register form</h2>
        <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
            <input
              type="text"
              className="form-control "
              placeholder="Enter Your First Name"
              name="first_name"
              value={first_name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Last Name"
              name="last_name"
              value={last_name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control "
              placeholder="Enter Your city Name"
              name="city"
              value={city}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control "
              placeholder="Enter Your State"
              name="state"
              value={state}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control "
              placeholder="Enter Your E-mail Address"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control "
              placeholder="Enter Your Age"
              name="age"
              value={age}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control "
              placeholder="Enter Your Website Name"
              name="web"
              value={web}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-primary btn-block" disabled=''>Register</button>
        </form>
        <div className="pt-3">
          <h6>If already have an account please <Link className="h6" to="/Login">
          Login here
          </Link> </h6>
        </div>
      </div>
    </div>
  );
};

export default Register;