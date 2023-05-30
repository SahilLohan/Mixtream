const mongoose = require("mongoose");
const Joi = require("joi");

const playlistSchema = new mongoose.Schema({
    name:{type:String,required:true},
    userid:{type:mongoose.Schema.Types.ObjectId,required:true},
    desc:{type:String},
    image:{type:String},
    songs:{type:Array,default:[]}
})

const validate = (playList) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		userid: Joi.string().required(),
		desc: Joi.string().allow(""),
		songs: Joi.array().items(Joi.string()),
		img: Joi.string().allow(""),
	});
	return schema.validate(playList);
};

const PlayList = mongoose.model("playList", playlistSchema);

module.exports = { PlayList, validate };