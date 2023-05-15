const signUp = require("express").Router();
const {User,Uservalidator} = require("../models/user");
const bcrypt = require("bcrypt");

//Requiring middle wares
const admin = require("../middleware/admin");
const auth = require("../middleware/auth")
const validObjectId = require("../middleware/validObjectId");

// create a user in database if it don't exist
signUp.post("/",async (req,res)=>{
    console.log("Signup request recieved");
    const recievedUserData = req.body;

    // Lets validate it 
    const {error} = Uservalidator(recievedUserData);
    if(error) 
        return res.status(400).send({message:error.details[0].message});

    // if no error found then Lets check if user already exist
    const userAlreadyExists = await User.findOne({email:recievedUserData.email});
    if(userAlreadyExists) 
        return res.status(403).send({message:"This Email already exists, Please try to login"});

    // No errors then We can save the use in database.
    // Let's Hash the Password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(recievedUserData.password , salt);
    
    // Let's save the new user data to database
    let newUser = new User({
        ...req.body,
        password:hashedPassword
    })
    await newUser.save();
    // Lets tell the frontend that newUser is saved successfully
    newUser.password=undefined;
    newUser.__v=undefined;
    console.log("Saving Successful -->\n");
    res.status(200).send({data:newUser,message:"Account Created Succesfully"});
})  

// if you are admin and want to get list of all users
signUp.get("/",admin,async(req,res)=>{
    console.log(req.body);
    const users = await User.find().select("-password -__v");
    res.status(200).send({data:users});
})

// if you are a logged-in and want to get your details
signUp.get("/:id",[validObjectId,auth],async(req,res)=>{
    console.log(req.body);

    const users = await User.findById(req.params.id).select("-password -__v");
    console.log("I am executed",users);
    res.status(200).send({data:users});
})

// if you are a logged-in and want to update your details
signUp.put("/:id",[validObjectId,auth],async(req,res)=>{
    console.log(req.body);
    const users = await User.findByIdAndUpdate(
        req.params.id,
        {$set:req.body},
        {new:true}
        ).select("-password -__v");
    res.status(200).send({data:users});
})

// if you are a logged-in and want to delete your account
signUp.delete("/:id",[validObjectId,admin],async(req,res)=>{
    console.log(req.body);
    const users = await User.findByIdAndDelete(req.params.id);
    res.status(200).send({message:"Successfully deleted the user"});
})

module.exports = signUp;