const mongoose=require("mongoose");

module.exports =  async()=>{
    try{
        const params={
            useNewUrlParser:true,
            useUnifiedTopology:true
        }
        await mongoose.connect(process.env.DB,params);
        console.log("Connection is set");
    }catch(error)
    {
        console.log("Error aa gai !!",error);
    }
    
}
