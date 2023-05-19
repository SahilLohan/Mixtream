import React, { useState } from "react";
import { Avatar } from "@mui/material";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header>
      <div class="header-container">
        <h1 class="header-title">Listening is Everything</h1>
        <div class="header-controls">
          {isLoggedIn && (
            <button onClick={handleLogout} class="header-control">Logout</button>
          )}
          <Avatar src={userImage} />
        </div>
      </div>
    </header>
  );
};

export default Header;