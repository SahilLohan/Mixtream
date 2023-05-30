import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast} from 'react-toastify';
import { Avatar } from '@mui/material';
import logo from "../images/logo.png"
import {useNavigate} from "react-router-dom";


const LoginPage = (props) => {

  var loginResponse;
  var navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data={
        email:email,
        password:password
    }
   
    console.log(data);
    // TODO: Send the form data to your backend
        try {
            setIsFetching(true);
            const url ="http://localhost:8080/api/login";
             loginResponse = await axios.post(url, data);
            setIsFetching(false);
            // Assuming you have received the user details as an array called 'loginResponse' from the server

            // Convert the array to JSON string
            const loginResponseString = JSON.stringify(loginResponse.data);
            // Store the JSON string in local storage
            localStorage.setItem('userData', loginResponseString);
            props.setUserDataState(loginResponse.data);
            // // Convert the JSON string back to an array
            const notify = () => toast.success("Signing in please wait...",{
              position:"bottom-center"
            });
            notify();
            setTimeout(()=>{
              navigate("/");
            },6000)

        } catch (error) {
            setIsFetching(false);
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status < 500
            ) {
                console.log("error 400-500",error.response.data);
                const notify = () => toast.error(error.response.data.message,{
                  position:"bottom-center"
                });

                notify();
            } else {
                console.log(error);
                const notify = () => toast.error("Internal server error",{
                  position:"bottom-center"
                });

                notify();
            }
        }
   

  };



  return (
    <div>
    <div className="headingOnPage">
            <Avatar className="headingLogo" src={logo} />
          <h1 style={{padding:"0 10px"}}>Mixtream</h1>
      </div>
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={()=>{
            setEmail(document.getElementById("email").value);
          }}
          required={true}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={()=>{
            setPassword(document.getElementById("password").value);
          }}
          required={true}
        />
      </div>
      <hr></hr>

      <div className="button-container">
        <button style={{backgroundColor:"#808080"}} type="button" onClick={()=>{navigate("/signup")}} className="btn btn-primary">Create New Account?</button>
        <button  type="submit" className="btn btn-primary">Login</button>
      </div>
      <ToastContainer />
    </form>
    </div>
  );
};
export default LoginPage;