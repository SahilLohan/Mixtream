import React, { useState } from "react";
import axios from "axios";
import { Avatar } from '@mui/material';
import logo from "../images/logo.png"
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setgender] = useState("male");

  const handleChange = (event) => {
    setgender(event.target.value);
  };

  const [isFetching, setIsFetching] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data={
        name:name,
        email:email,
        password:password,
        gender:gender
    }

    console.log(data);
    // TODO: Send the form data to your backend
        try {
            setIsFetching(true);
            const url ="http://localhost:8080/api/signup";
            var signupResponse = await axios.post(url, data);
            setIsFetching(false);

            const notify = () => toast.success("You have signup successfully",{
              position:"bottom-center"
            });
            notify();
            console.log("Account created successfully");
            setTimeout(()=>{
              navigate("/login");
            },5500)
            

        } catch (error) {
            setIsFetching(false);
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                console.log("error 400-500",error.response.data);
                
                const notify = () => toast.error(error.response.data.message,{
                  position:"bottom-center"
                });

                notify();

                if(error.response.data.message==='User with given email is already exist'){
                  setTimeout(()=>{
                    navigate("/login");
                  },5500)
                }
                
            } else {
                console.log(error);
                const notify = () => toast.error(error.status,{
                  position:"bottom-center"
                });
                notify();
            }
        }

  };

  return (
    <div  >
      <div className="headingOnPage">
            <Avatar className="headingLogo" src={logo} />
          <h1 style={{padding:"0 10px"}}>Mixtream</h1>
      </div>
      

    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={()=>{
            setName(document.getElementById("name").value);
          }}
          required={true}
        />
      </div>

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

      <div className="gender-selector">
      <h2>Select Gender</h2>
      <div className="gender-selector-inside">
          <input
            type="radio"
            name="gender"
            value="male"
            id="male"
            //checked={gender === "male"}
            onChange={handleChange}
            className="male radioInput"
            defaultChecked={true}
          />
          <label htmlFor="male">Male</label>
        </div>
        <div className="gender-selector-inside">
        <input
          type="radio"
          name="gender"
          value="female"
          id="female"
          checked={gender === "female"}
          onChange={handleChange}
          className="female radioInput"
        />
        <label htmlFor="female">Female</label>
        </div>
        <div className="gender-selector-inside">
        <input
          type="radio"
          name="gender"
          value="non-binary"
          id="non-binary"
          checked={gender === "non-binary"}
          onChange={handleChange}
          className="non-binary radioInput"
        />
        <label htmlFor="non-binary">Non-Binary</label>
        </div>

    </div>
          <hr></hr>
      <div className="button-container">
        <button style={{backgroundColor:"#808080"}} type="button" onClick={()=>{navigate("/login")}}>Already have an Account?</button>
        <button  type="submit" className="btn btn-primary">Sign Up</button>
      </div>
      <ToastContainer />
    </form>
    </div>
  );
};

export default SignupForm;