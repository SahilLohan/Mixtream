import React from "react";
import { useState } from "react";
import LoginPage from "./LoginPage"
import SignupPage from "./signupPage"
import LandingPage from "./LandingPage";
import Main from "./Main";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";

const App = ()=>{
    // // important code
    const [userData,setUserData] = useState(JSON.parse(localStorage.getItem('userData'))); 

    return(
        <Router>
            <Routes >
                <Route path="/login" element={<LoginPage setUserDataState={setUserData} />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/" element={ userData == undefined ? <LandingPage /> : <Main /> }/>
            </Routes>
        </Router>
    )
}

export default App;

