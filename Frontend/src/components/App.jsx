import React from "react";
import { topHits,romanceSongs } from "../homeSongs";
import Series from "./Series";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Head";
const App = ()=>{
    var [appState,updateAppState] = useState("justLoggedInState");

    // if user clicks on any playlist
    const fun = ()=>{
        const aud = new Audio("https://pagalfree.com/musics/128-21%20te%2018%20-%20Veet%20Baljit%20128%20Kbps.mp3");
        aud.play();
        console.log(aud.volume);

        setTimeout(()=>{
            aud.volume=0.2;
            setTimeout(()=>{
                aud.pause();
                console.log(aud.duration);
            },5000)
        },5000)
        // https://pagalfree.com/musics/128-Senorita - Tony Kakkar 128 Kbps.mp3
    }
    


    return(
        // jab user ne just login kiya ho
        <div className="container" >
            <Sidebar />
            <div className="mainContainerRight" onClick={fun}>
                <Header />
                <hr></hr>
                <Series title="Top Hits" songs={topHits} />
                <Series title="Romance" songs={romanceSongs} />
            </div>
        </div> 
        // <MusicBar />
    )
}

export {App};