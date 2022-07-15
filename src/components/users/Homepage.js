import React from "react";
import {Link} from 'react-router-dom';

const Homepage = () => {

  return (
    <div className="container" style={{marginTop: "150px"}}>
      <div className="py-4">
          <h1>React CRUD App</h1>
          <div className="lead"> This is a React App You register here and the details are stored <br></br> in json server by logging in you can see the details of the profile and also you can edit the user details... </div>
      </div>
      <div className="py-4">
      <Link className="btn btn-outline-primary mr-2 " to="/Register">Register</Link>
      <Link className="btn btn-outline-dark ml-1 " to="/Login">Login</Link>
      </div>
    </div>
  );
};

export default Homepage;