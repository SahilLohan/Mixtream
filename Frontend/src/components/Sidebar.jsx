import React, { useState, useEffect } from "react";
import { IconButton, ListItem, ListItemIcon, ListItemText , Avatar } from '@mui/material';
import { Home, Search, LibraryMusic, Settings } from '@mui/icons-material';
import logo from "../images/logo.png"


const Sidebar = (props) => {

// Playlist ka mdel kuch aisa hoega

//   const playlistSchema = new mongoose.Schema({
//     name:{type:String,required:true},
//     user:{type:mongoose.Schema.Types.ObjectId,required:true},
//     desc:{type:String},
//     image:{type:String},
//     songs:{type:Array,default:[]}
// })
  return (
    <div className="sidebar">

        <ListItem >
          <ListItemIcon>
            <Avatar src={logo} />
          </ListItemIcon>
          <h1>Mixtream</h1>
        </ListItem>

      <ul>
        <ListItem button onClick={()=>{props.setMainPageState("main");localStorage.setItem('pageState',"main")}}>
          <ListItemIcon>
            <Home sx={{ color: "white" }}/>
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={()=>{props.setMainPageState("search");localStorage.setItem('pageState',"search")}}>
          <ListItemIcon>
            <Search sx={{ color: "white" }}/>
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>
        <ListItem button onClick={()=>{props.setMainPageState("playlist");localStorage.setItem('pageState',"playlist")}}>
          <ListItemIcon>
            <LibraryMusic sx={{ color: "white" }}/>
          </ListItemIcon>
          <ListItemText primary="Playlists" />
        </ListItem>
        {/* <ListItem button>
          <ListItemIcon>
            <Settings sx={{ color: "white" }}/>
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem> */}
      </ul>
    </div>
  );
};

export default Sidebar;
