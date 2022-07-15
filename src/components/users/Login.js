import React, {useState} from "react";
import axios from 'axios'
import { useHistory, Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export default function Login(){

    let history = useHistory();
    let userDetails;
    let presentUser;
    let isUserPresent=false;
    let loggedInUser;

    const [details, setDetails] = useState({
        first_name: "",
        last_name: "",
        city: "",
        state: "",
        email: "",
        age: "",
        web: ""
    });

   // const api = "http://localhost:3005/users";

    const { first_name, email} = details;

    const onInputChange = e => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    //const [error, setError] = useState("");

    const onSubmit = async e => {
        e.preventDefault();
        if(!details.first_name, !details.email){
            toast.error('Enter all the fields');
        }else{ 
            await axios.get(`http://localhost:3003/users`)
            .then((response) => {
                userDetails=response;
            });
            console.log("userDetails", userDetails);

            userDetails['data'].forEach(element => {
                if(element.first_name!==undefined && (element.first_name.toLowerCase() === details.first_name.toLowerCase()) && element.email !==undefined && (element.email.toLowerCase() === details.email.toLowerCase())){
                    presentUser=element;
                    isUserPresent=true;
                    return presentUser;
                }
            })
            console.log("presentUser", presentUser);
            if(isUserPresent){  
            await axios.get(`http://localhost:3003/users/${presentUser.id}`)
                .then((response) => {
                    console.log("response",response);
                    if(response.data!=null){
                        loggedInUser = response.data
                    };
                    console.log("loggedInUser", loggedInUser);
                })
                setDetails(""); 
                history.push(`/users/${loggedInUser.id}`);
                
            }else{
                toast.error("Ooops... User not found");
            }
        }
    };

    return(
        <div className="row" style={{marginTop:"100px"}}>
            <ToastContainer/>
            <div className=" col-sm-12 col-md-4 mx-auto shadow p-4 border">
                <h2 className="text-center mb-4">Login form</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your User Name"
                        name="first_name"
                        value={first_name}
                        onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Password"
                        name="email"
                        value={email}
                        onChange={e => onInputChange(e)}
                        />
                    </div>
                    <button className="btn btn-primary btn-block"> Log In </button>
                </form>
                <ToastContainer/>
                <div className="pt-3">
                    <h6>Don't have an account please <Link className="h6" to="/Register">
                    Register here
                    </Link> </h6>
                </div>
            </div>
        </div>
    );

}