import React from "react";
import LoginPage from "./LoginPage"
import SignupPage from "./signupPage"
import LandingPage from "./LandingPage";
import Main from "./Main";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";

const App = ()=>{
    // // important code
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log(userData.data.Token);

    return(
        <Router>
            <Routes >
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/" element={ userData.data == undefined ? <LandingPage /> : <Main /> }/>
            </Routes>
        </Router>
    )
}

export default App;

