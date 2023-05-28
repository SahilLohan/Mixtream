import React from "react";
import { Song } from "./Song";

const Series = (props)=>{
    return(
        <div className="container">
            <h1>{props.title}</h1>
            <div className="seriesContainer">
            {props.songs.map((song,index)=>{
                return (
                    <Song 
                        key={index}
                        img={song.image}
                        name={song.name}
                        duration={song.duration}
                        artist={song.artist}
                    />
                )
            })}
            </div>
        </div>
    )
}

export default Series;