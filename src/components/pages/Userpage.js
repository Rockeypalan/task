import React, { useState, useEffect } from "react";
import axios from "axios";
import {Pagination} from 'antd';
import { Link } from "react-router-dom";

const Userpage = () => {

  const [users, setUser] = useState([]);

  const [loading, setLoading] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(7);

  useEffect(() => {
    loadUsers();
  }, []);

  //const api = http://localhost:3003;

  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:3003/users`);
    setUser(result.data.reverse());
    setLoading(result.data.length);
  };

  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const currentPosts = users.slice(indexOfFirstPage, indexOfLastPage);

  // const onShowSizeChange = ( pageSize) => {
  //   setPostPerPage(pageSize);
  // };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:3003/users/${id}`);
    loadUsers();
  };

  const [value, setValue] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    return await axios
    .get(`http://localhost:3003/users?q=${value}`)
    .then((response) => {
      setUser(response.data);
      setValue("")
    })
    .catch((err) => console.log(err));
  };
  const handleReset= () =>{
    loadUsers();
  };

  const sortOptions = ["first_name", "last_name", "city", "email", "state"];
  const [sortValue, setSortValue] = useState("");

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    return await axios
    .get(`http://localhost:3003/users?_sort=${value}&_order=asc`)
    .then((response) => {
      setUser(response.data);
    })
    .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div  className="d-flex justify-content-center">
        <form  className="mt-4"
          onSubmit={handleSearch}>
            <div className=" col input-group flex-nowrap">
              <input type="text" className="form-control" value={value} onChange={e => setValue(e.target.value)} placeholder="Search Name..."/>
              <button className="btn btn-primary mx-2">Search</button>
              <button className="btn btn-info" onClick={() => handleReset()}>Reset</button>
            </div>
        </form>
      </div>
      <div className="py-3">
        <Link className="btn btn-secondary mb-2 " to={`/`}>
          Back to Home page
        </Link>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
              <th scope="col">Email</th>
              <th scope="col">Website</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.city}</td>
                <td>{user.state}</td>
                <td>{user.email}</td>
                <td><a href={user.web} target="_blank">{user.web}</a></td>
                {/* <td>
                  <Link class="btn btn-secondary mr-2" to={`/users/${user.id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/users/edit/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container pb-5" >
        <div className="row ">
          <div className="col md-4">
            <select 
              style={{width: "50%", borderRadius:" 2px", height: "35px"}}
              onChange={handleSort}
              value={sortValue}>
                <option>Select items for Sorting</option>
                {sortOptions.map((item, index) => (
                  <option value={item} key={index} >{item}</option>
                ))}
            </select>
          </div>
          <div className="col md-8">
            <Pagination 
              onChange = {(value) => setCurrentPage(value)}
              pageSize = {postsPerPage}
              total = {loading}
              current = {currentPage}
              // showSizeChanger
              // onShowSizeChange = {onShowSizeChange}
            />  
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userpage;