const login = require("express").Router();
const {User} = require("../models/user");
const bcrypt = require("bcrypt");

login.post("/",async (req,res)=>{

    // lets check if user exist or not
    let user = await User.findOne({email:req.body.email}); // returns the whole user
    if(!user)
        return res.status(400).send({message:"Invalid Email"});

    // lets compare password 
    const validPassword = await bcrypt.compare(req.body.password,user.password);

    if(!validPassword)
        return res.status(400).send({message:"Invalid password"});

    const token = user.generateAuthToken();
    res.status(200).send({data:token,message:"Signing in please wait ..."})
    
})  

module.exports = login;