import React from "react";
import { Song } from "./Song";
const Series = (props)=>{
    return(
        <div className="seriesContainer">
            {props.songs.map((song)=>{
                return (
                    <Song 
                        img={song.songImageUrl}
                        name={song.name}
                        duration={song.duration}
                        artist={song.artist}
                    />
                )
            })}
        </div>
    )
}

export default Series;