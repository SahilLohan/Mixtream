const mongoose = require("mongoose");
const joi = require("joi");

const playlistSchema = new mongoose.Schema({
    name:{type:String,required:true},
    user:{type:mongoose.Schema.Types.ObjectId,required:true},
    desc:{type:String},
    image:{type:String},
    songs:{type:Array,default:[]}
})