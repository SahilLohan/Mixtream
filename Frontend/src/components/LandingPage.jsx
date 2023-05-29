import React from "react";
import { Navigate, useNavigate } from "react-router-dom";



const LandingPage=(props)=>{
     var navigate = useNavigate();
     const userData = JSON.parse(localStorage.getItem('userData')); 

    return(
        <h1>Hello ji</h1>
    )
}

export default LandingPage;