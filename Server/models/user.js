const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");


// create a schema for our user information

const userSchema = new mongoose.Schema({
    name:       {type:String,required:true},
    email:      {type:String,required:true,unique:true},
    password:   {type:String,required:true},
    gender:     {type:String,required:true},
    playlists:  {type:[String],default:[]},
    likedSongs: {type:[String],default:[]},
    isAdmin:    {type:Boolean,default:false}
})

userSchema.methods.generateAuthToken = function()
{
    const token = jwt.sign(
        {_id:this._id,name:this.name,isAdmin:this.isAdmin},
        process.env.PRIVATEKEY,
        {expiresIn:"7d"}
    )
    return token; 
}

const userValidator = (user)=>{
    const schema = joi.object({
    name:joi.string().required(),   
    email:joi.string().required().email(),
    password:passwordComplexity().required(),
    gender:joi.string().valid("male","female","non-binary").required()
    })
    return schema.validate(user);
}

const User = mongoose.model("user",userSchema);

module.exports = {User,userValidator};