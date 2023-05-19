import React from "react";
import { topHits,romanceSongs } from "../homeSongs";
import Series from "./Series";
import { useState } from "react";
import Sidebar from "./Sidebar"
import Header from "./Head"
const App = ()=>{
    var [appState,updateAppState] = useState("justLoggedInState");

    // if user clicks on any playlist
    
    return(
        // jab user ne just login kiya ho
        <div className="container" >
            <Sidebar />
            <div className="mainContainerRight">
                <Header />
                <Series title="Top Hits" songs={topHits} />
                <Series title="Romance" songs={romanceSongs} />
            </div>
        </div> 
    )
}

export {App};