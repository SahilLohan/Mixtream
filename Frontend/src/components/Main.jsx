import React, { useEffect } from "react";
import { topHits,romanceSongs } from "../homeSongs";
import Series from "./Series";
import { useState} from "react";
import Sidebar from "./Sidebar";
import Header from "./Head";
import MusicBar from "./MusicBar";
import { ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import { imageListClasses } from "@mui/material";
import { useNavigate } from "react-router-dom";
// Playlist ka model kuch aisa hoega

//   const playlistSchema = new mongoose.Schema({
//     name:{type:String,required:true},
//     user:{type:mongoose.Schema.Types.ObjectId,required:true},
//     desc:{type:String},
//     image:{type:String},
//     songs:{type:Array,default:[]}
// })

const Main = (props)=>{  // userData and setUserData are props
    const [mainPageState,setMainPageState] = useState("main") // main , playlist , search
    if(localStorage.getItem('pageState')!=undefined && localStorage.getItem('pageState')!=mainPageState){
        setMainPageState(localStorage.getItem('pageState'));
    }
    const [searchedSongName,setSearchedSongName] = useState("");
    const [createdplaylistName,setCreatedPlaylistName] = useState("");
    const [currentPlaylist,setCurrentPlaylist] = useState(null);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [userPlaylists,setUserPlaylists] = useState([]); // array of objects
    var navigate = useNavigate();

    var searchAsong = async (event) =>{
        event.preventDefault();
    }

    var createPlaylistFunction = async (event) => {

        event.preventDefault();

        const headers = {
            'x-auth-token': props.userData.data.Token
        };
          
        const data={
            name:createdplaylistName,
            userid:props.userData.data.UserDetails._id
        }
    
        // console.log(data);
        // TODO: Send the form data to your backend
            try {
                setIsFetching(true);
                const url ="http://localhost:8080/api/playlists";
                var playlistResponse = await axios.post(url, data , { headers });
                setIsFetching(false);
    
                toast.success("playlist created successfully",{
                  position:"bottom-center"
                });

                const newUserData = {
                    ...props.userData,
                }

                console.log("old data :\n",props.userData);
                
                newUserData.data.UserDetails = playlistResponse.data.UserDetails;

                props.setUserData(newUserData);
                console.log("new data : \n",newUserData);
                // Convert the array to JSON string
                const newUserDataString = JSON.stringify(newUserData);
                console.log(newUserDataString)
                // Store the JSON string in local storage
                localStorage.setItem('userData', newUserDataString);
                localStorage.setItem('pageState',mainPageState);
                window.location.reload(true);


    
            } catch (error) {
                setIsFetching(false);
                if (error.response && error.response.status >= 400 && error.response.status < 500) {
                    console.log("error 400-500",error.response.data);
                    
                    const notify = () => toast.error(error.response.data.message,{
                      position:"bottom-center"
                    });
    
                    notify();

                    
                } else {
                    console.log(error);
                    const notify = () => toast.error(error.status,{
                      position:"bottom-center"
                    });
                    notify();
                }
            }


   
    }

    return(
        <div className="container" >
        {/* pass the user playlists here */}
        <Sidebar setMainPageState={setMainPageState}/>
        <div className="mainContainerRight">
            {/* User name daal diya h */}
            <Header setUserData={props.setUserData}/> 
            <hr></hr>
            

            {mainPageState==="main" && <div><Series title="Top Hits" songs={topHits} setCurrentPlaylist={setCurrentPlaylist} setCurrentIndex={setCurrentIndex} />
            <Series 
            title="Romance" 
            songs={romanceSongs} 
            setCurrentPlaylist={setCurrentPlaylist} 
            setCurrentIndex={setCurrentIndex} /></div>}

            {mainPageState==="playlist" && <form style={{display:"flex" , flexDirection:"row",justifyContent:"left"}} >
                    <div className="form-group">
                        <input
                        style={{width:"100%"}}
                        type="text"
                        name="createplaylist"
                        id="createplaylist"
                        value={createdplaylistName}
                        placeholder="Enter playlist name"
                        onChange={()=>{
                            setCreatedPlaylistName(document.getElementById("createplaylist").value);
                        }}
                        required={true}
                        />
                    </div>
                    <button type="button" style={{width:"150px", height:"39px" , marginLeft:"40px"}}
                    onClick={createPlaylistFunction} >Create PlaytList</button>
                </form>}

            {mainPageState==="playlist"
            ?
            props.userPlaylists != undefined
            ?
            props.userPlaylists.map((object,index)=>{
                return (
                    <Series
                     key={index}
                     title={object.playlist.name} 
                     songs={object.songs}
                     setCurrentPlaylist={setCurrentPlaylist} 
                     setCurrentIndex={setCurrentIndex}
                     />
                        )
            })
            :
            <div >

              <h3 style={{textAlign:"center",margin:"30px auto"}}>No playlist Found</h3>

            </div>
            :null}
            


            {// search page
                mainPageState==="search" && <form style={{display:"flex" , flexDirection:"row",justifyContent:"left"}} >
                    <div className="form-group">
                        <input
                        style={{width:"100%"}}
                        type="text"
                        name="search"
                        id="search"
                        value={searchedSongName}
                        placeholder="Search a song"
                        onChange={()=>{
                            setCreatedPlaylistName(document.getElementById("search").value);
                        }}
                        required={true}
                        />
                    </div>
                    <button type="button" style={{width:"150px", height:"39px" , marginLeft:"40px"}}
                    onClick={searchAsong} >Search</button>
                </form>}

        </div>
        {currentPlaylist!=null && <MusicBar array={currentPlaylist} index={currentIndex}/>}
        <ToastContainer />
        </div> 
    )
}

export default Main;