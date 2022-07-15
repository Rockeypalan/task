import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const User = () => {
  const [loggedInUser, setloggedInUser] = useState({
    first_name: "",
    last_name: "",
    city: "",
    state: "",
    email: "",
    age: "",
    web: ""
  });
  
 // const api = "http://localhost:3005/users";

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);
  
  const loadUser = async () => {
    const res = await axios.get(`http://localhost:3003/users/${id}`)
    setloggedInUser(res.data);
  };
 
  return (
    <div className="row d-flex mt-5 ml-5">
      <ToastContainer/>
      <div className='col-6  '>
        {/* <h4>User profile:</h4> */}
        <div className="card mb-3" style={{maxWidth: "540px"}}>
          <div className="row ">
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <img src="https://th.bing.com/th/id/R.f29406735baf0861647a78ae9c4bf5af?rik=GKTBhov2iZge9Q&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_206976.png&ehk=gCH45Zmryw3yqyqG%2fhd8WDQ53zwYfmC8K9OIkNHP%2fNU%3d&risl=&pid=ImgRaw&r=0" class="img-fluid rounded-start" alt="Profile pic"/>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{loggedInUser.first_name} {loggedInUser.last_name}</h5>
                <p className="card-text">You are logged in Successfully. Logged in details are displayed you can edit the details of the users..</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                <Link className="btn btn-outline-danger my-3" to="/Login">
                  Log out
                </Link>
                <Link
                  class="btn btn-outline-primary ml-3"
                  to={`/users/edit/${loggedInUser.id}`}
                  >
                  Edit
                </Link>
                  <Link className="btn btn-outline-warning ml-3" to="/users">All user </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-6'>
        <ul className="list-group w-50">
        <h4>User Id: {id} </h4>
          <li className="list-group-item"><strong>First name: </strong> {loggedInUser.first_name}</li>
          <li className="list-group-item"><strong>Last name: </strong> {loggedInUser.last_name}</li>
          <li className="list-group-item"><strong>City: </strong> {loggedInUser.city}</li>
          <li className="list-group-item"><strong>State: </strong> {loggedInUser.state}</li>
          <li className="list-group-item"><strong>email: </strong> {loggedInUser.email}</li>
          <li className="list-group-item"><strong>age: </strong> {loggedInUser.age}</li>
          <li className="list-group-item"><strong>website: </strong> {loggedInUser.web}</li>
        </ul>
      </div>
    </div>
  );
};

export default User;