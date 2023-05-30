import React, { useEffect } from "react";
import { useState } from "react";
import LoginPage from "./LoginPage"
import SignupPage from "./signupPage"
import LandingPage from "./LandingPage";
import Main from "./Main";
import axios from "axios";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";

const App = ()=>{
    // // important code
    const [userData,setUserData] = useState(JSON.parse(localStorage.getItem('userData'))); 
    const [userPlaylists,setUserPlaylists] = useState([]); // array of objects

    useEffect(() => {
        const arrayOfObjectsOfPlaylistsAndTheirSongs = [];
        // we will get a playlist using playlistId
        if(userData!=undefined){

        userData.data.UserDetails.playlists.forEach(sendReq)

        async function sendReq(playlistId,index,playlists){
        const headers = {
            'x-auth-token': userData.data.Token
        };


        const response = await axios.get("http://localhost:8080/api/playlists/"+playlistId,
                                        {
                                            headers
                                        });

        arrayOfObjectsOfPlaylistsAndTheirSongs.push(response.data);
        console.log("after pushing : ",arrayOfObjectsOfPlaylistsAndTheirSongs)
        setTimeout(()=>{
            setUserPlaylists(arrayOfObjectsOfPlaylistsAndTheirSongs);
        },2800)
        }

        // console.log("The array of playlist id were",userData.data.UserDetails.playlists)

        
        
    }
      }, [userData]);

    return(
        <Router>
            <Routes >
                <Route path="/login" element={<LoginPage setUserDataState={setUserData} />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/" element={ userData == undefined 
                                ? 
                                <LandingPage /> 
                                : 
                                <Main 
                                    userData={userData} 
                                    setUserData={setUserData}
                                    userPlaylists={userPlaylists}
                                    setUserPlaylists={setUserPlaylists}
                                /> 
                                }/>
            </Routes>
        </Router>
    )
}

export default App;

