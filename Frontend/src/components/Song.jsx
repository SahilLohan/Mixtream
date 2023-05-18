import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const Song = (props)=>{ // props m song ka naam,image and artist pass krenge
    return(
        <div className="card">
            <PlayCircleIcon className='playIcon'/>
            <img src={props.img} alt='img' />
            <h2>{props.name} </h2>
            <p>By : {props.artist}</p>
            <p>Duration : {props.duration}</p>
        </div>
    )
}

export {Song};