const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    const token = req.header("x-auth-token");

    if(!token)
        return res.status(400).send({message:"Access Denied. No auth token"});
    
    jwt.verify(token,process.env.PRIVATEKEY,(error,validToken)=>{
        if(error)
        {
            return res.status(400).send({message:"Invalid Token"});
        }
        else{
            if(!validToken.isAdmin){
                return res.status(400).send({message:"You don't have access to this page"});
            }
            else{
                req.user = validToken;
                next();
            }
            
        }
    })
}