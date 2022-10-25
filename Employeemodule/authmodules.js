const jwt = require("jsonwebtoken")

exports.authuser=(req,res,next)=>{
    if(!req.headers.accesstoken){
        return res.status(400).send({msg :"Token not found"})
    }
    try{
       const user= jwt.verify(req.headers.accesstoken,process.env.SECRET_KEY)
        req.body.currentuser=user
       next();
    }catch(err){
        console.error(err);
        res.status(400).send({msg:"unathuroised"})
    }

    
    exports.authorizeduser=(req,res,next)=>{
        if(req.body.currentuser.role===admin)next();
        else return
    }
}