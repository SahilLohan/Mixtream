import React, { useState, useEffect } from "react";
import { IconButton, ListItem, ListItemIcon, ListItemText , Avatar } from '@mui/material';
import { Home, Search, LibraryMusic, Settings } from '@mui/icons-material';
import logo from "../images/logo.png"
const Sidebar = () => {


  return (
    <div className="sidebar">

        <ListItem >
          <ListItemIcon>
            <Avatar src={logo} />
          </ListItemIcon>
          <h1>Mixtream</h1>
        </ListItem>

      <ul>
        <ListItem button>
          <ListItemIcon>
            <Home sx={{ color: "white" }}/>
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Search sx={{ color: "white" }}/>
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LibraryMusic sx={{ color: "white" }}/>
          </ListItemIcon>
          <ListItemText primary="Playlists" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Settings sx={{ color: "white" }}/>
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </ul>
    </div>
  );
};

export default Sidebar;
