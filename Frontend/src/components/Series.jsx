import React from "react";
import { Song } from "./Song";

const Series = (props)=>{
    return(
        <div className="container" onClick={()=>{
            if(props.songs!=undefined && props.songs.length>0)
            props.setCurrentPlaylist(props.songs)
            }}>
            <h1>{props.title}</h1>
            {   
                props.songs!=undefined && props.songs.length>0
                ? 
                <div className="seriesContainer">
                { 
                    props.songs.map((song,index)=>{
                        return (
                            <Song 
                                key={index}
                                id={index}
                                img={song.image}
                                name={song.name}
                                duration={song.duration}
                                artist={song.artist}
                                setCurrentIndex={props.setCurrentIndex}
                            />
                        )
                    })
                }            
                </div>
                :
                <div style={{height:"110px"}}>
                <h3 style={{margin:"50px auto" ,textAlign:"center"}}>Playlist is Empty</h3>
                </div>
            }
        </div>
    )
}

export default Series;