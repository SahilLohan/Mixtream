// import Basic packages
require("dotenv").config(); // importing variables from env file

// To avoid try catch blocks in sync functions
require("express-async-errors");

// Express
const express = require("express");
const app=express();
app.use(express.json());

// To bypass api strict security
const cors = require("cors");
app.use(cors());

// Import routes
const signUpRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const songsRouter = require("./routes/songs");
const playlistRouter = require("./routes/playlists");
const searchRouter = require("./routes/search");


// lets make a database connection
const DataBaseConnectionMaker = require("./DataBase");
DataBaseConnectionMaker();

// lets Handle routes

// To handle http://localhost:3000/api/signup/
app.use("/api/signup",signUpRouter);
// To handle http://localhost:3000/api/login/
app.use("/api/login",loginRouter);
//
app.use("/api/songs",songsRouter);
app.use("/api/playlists",playlistRouter);
app.use("/api/",searchRouter);

app.listen(process.env.PORT || 8080,()=>{
    console.log("Server start successfully");
})
