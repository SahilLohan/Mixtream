import React from "react";
import { topHits,romanceSongs } from "../homeSongs";
import Series from "./Series";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Head";
import MusicBar from "./MusicBar";
import { ToastContainer, toast} from 'react-toastify';



const Main = ()=>{
    toast.success("Logged in successfully",{
        position:"top-center"
      });
    return(
        <div className="container" >
        <Sidebar />
        <div className="mainContainerRight">
            <Header />
            <hr></hr>
            <Series title="Top Hits" songs={topHits} />
            <Series title="Romance" songs={romanceSongs} />
        </div>
        <MusicBar array={topHits} index={2}/>
        <ToastContainer />
        </div> 
    )
}

export default Main;