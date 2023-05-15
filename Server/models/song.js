const mongoose = require("mongoose");
const joi = require("joi");

const songSchema = new mongoose.Schema({
    
        name:      {type:String,required:true},
        artist:    {type:String,required:true},
        songUrl:   {type:String,required:true},
        image:     {type:String,required:true},
        duration:  {type:String,required:true}
})

const Songvalidator = (song)=>{
    const schema = joi.object({
    name:joi.string().required(),   
    artist:joi.string().required(),  
    songUrl:joi.string().required(),  
    image:joi.string().required(),  
    duration:joi.string().required()
    })
    return schema.validate(song);
}

const Song = mongoose.model("song",songSchema) ;

module.exports = {Song , Songvalidator}