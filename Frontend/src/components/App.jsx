import React from "react";
import { topHits,romanceSongs } from "../homeSongs";
import Series from "./Series";

import {Song} from "./Song";

const App = ()=>{
    return(
        <div className="mainContainer">
            <Series title="Top Hits" songs={topHits}/>
            <Series title="Romance" songs={romanceSongs}/>
        <Song 
            img="https://media.istockphoto.com/id/1090431366/vector/love-music-neon-sign.jpg?s=612x612&w=0&k=20&c=FE2W1fcsfPk6N5Bqlbx2Ty3VHBnUXPEFy2P-sizDRE4=" 
            name="Love You"
            duration="4:03"
            artist="Sonu Nigam"
        />
        </div>
        
    )
}

export {App};