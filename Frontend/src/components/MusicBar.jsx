import { IconButton} from "@mui/material";
import { Pause, PlayArrow, VolumeUp, VolumeDown, ArrowRight, ArrowLeft } from "@mui/icons-material";
import { useState, useRef } from 'react'
import Slider from './slider/Slider'

// const songSchema = new mongoose.Schema({
    
//   name:      {type:String,required:true},
//   artist:    {type:String,required:true},
//   songUrl:   {type:String,required:true},
//   image:     {type:String,required:true},
//   duration:  {type:String,required:true}
// })

const MusicBar = (props) => {
  const [percentage, setPercentage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume,setVolume] = useState(0);
  const [song,setSong] = useState(props.array[props.index].songUrl);
  const [index,setIndex]=useState(props.index);
  const audioRef = useRef()

  const onChange = (e) => {
    const audio = audioRef.current;
    console.log("I am Okay ",e.target);
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
    console.log("I am Okay too");
  }
 
  const play = () => {
    const audio = audioRef.current
    audio.volume = volume;
    audio.src = props.array[index].songUrl;
    audio.currentTime=currentTime;
    if (!isPlaying) {
      setIsPlaying(true)
      audio.play()
    }else{
      setIsPlaying(false)
      audio.pause()
    }
  }

  const getCurrDuration = (e) => {
    const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
    const time = e.currentTarget.currentTime

    setPercentage(+percent)
    setCurrentTime(time.toFixed(2))
  }

  return (
    <div className='musicBar-container'>
      <audio
        ref={audioRef}
        onTimeUpdate={getCurrDuration}
        onLoadedData={(e) => {
          setDuration(e.currentTarget.duration.toFixed(2))
        }}
        src={song}
      ></audio>

        {/* song and arist */}

        <div className="musicPlayerTop">
          <h4>{props.array[index].name} <br></br>by {props.array[index].artist}</h4>
        <div className="musicPlayerMid">
          <h4>{currentTime}</h4>
          <div className="sliderContainer">
            <Slider percentage={percentage} onChange={onChange} />
          </div>
          <h4>{duration}</h4>
          
        </div>
        <div className="volumeControlsContainer" id="volumeControls">
        
        <div className="progress">

              <IconButton size="large"
                className="controls volumedown"
                onClick={() => {volume>0.1 ? setVolume(volume - .1) : setVolume(0); const audio = audioRef.current; audio.volume = volume;}}
              >
                <VolumeDown className="controlIcon"/>
              </IconButton>
              


                <input className="controls volume" type="range" min="0" max="100" value={volume*100} onChange={(e) => {setVolume(e.target.value/100);const audio = audioRef.current; audio.volume = volume;}}></input>
            



              <IconButton size="large"
                className="controls volumeup"
                onClick={() => {volume<0.9 ? setVolume(volume + .1) : setVolume(1);     const audio = audioRef.current; audio.volume = volume;}}
              >
                <VolumeUp className="controlIcon"/>
              </IconButton>
          </div>

          </div>
        </div>
        
        <div className="musicPlayerBottom">
          <div className="playControlsContainer" id="playControls">
              <IconButton size="large" // Previous song
                className="controls previous"
                onClick={()=>{
                  if(isPlaying){
                    setIsPlaying(!isPlaying);
                  }
                  index > 0 ? setIndex(index-1):setIndex(props.array.length-1);
                  setPercentage(0);
                    setSong(props.array[index].songUrl);
                    setCurrentTime(0);
                  }}
              >
                <ArrowLeft className="controlIcon"/>
              </IconButton>
              
              <IconButton size="large"
                className="controls play-pause"
                onClick={play}
              >
                {isPlaying ? <Pause className="controlIcon"/> : <PlayArrow className="controlIcon"/>}
              </IconButton>
        
              <IconButton size="large"
                className="controls next"
                onClick={()=>{
                  if(isPlaying){
                    setIsPlaying(!isPlaying);
                  }
                  index < props.array.length-1 ? setIndex(index+1):setIndex(0);
                  setPercentage(0);
                  setSong(props.array[index].songUrl);
                  setCurrentTime(0);
                  
                }}
              >
                <ArrowRight className="controlIcon"/>
              </IconButton>
        
            </div>

            
        </div>


        </div>
      )
    
      
    
    };
    
    export default MusicBar;





    // <div className="music-player">
    
    