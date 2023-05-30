import React, { useState } from "react";
import { Avatar } from "@mui/material";

const Header = (props) => {
  const [userImage] = useState(props.image);

  const handleLogout = () => {
    localStorage.clear();
    props.setUserData(undefined);
  };

  return (
    <header>
      <div className="header-container">
        <h1 className="header-title">Listening is Everything</h1>
        <div className="header-controls">

            <button onClick={handleLogout} className="header-control">Logout</button>

          <Avatar src={userImage} />
        </div>
      </div>
    </header>
  );
};

export default Header;