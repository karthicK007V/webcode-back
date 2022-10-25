const mongo = require('../connect');
const bcrypt=require("bcrypt");
const jwt =require("jsonwebtoken");



exports.signup=async(req,res,next)=>{
    console.log(req.body);
    try{ 
      const existuser= await mongo.selectdb
      .collection("user").
      findOne({email:req.body.email});
        if(existuser)
           return  res.status(400).send({msg : "you are already register user"})
        
        

        const randomstr =await bcrypt.genSalt(10);
         req.body.password=await bcrypt.hash(req.body.password,randomstr);
        
      const insres= await mongo.selectdb.collection("user").insertOne({...req.body})
      res.send(insres)
    }catch(err){

        console.log(err);
        res.status(500).send(err);
    }


}
exports.signin=async(req,res,next)=>{
   
  try{
    const existuser = await mongo.selectdb.collection('user').findOne({email:req.body.email});
    if(!existuser){
       return  res.status(500).send({msg : "you are not a register user please sign in here"})
    }
    const isvalid=await bcrypt.compare(req.body.password,existuser.password)
   if(!isvalid){
    return res.status(400).send({msg:"Incorrect password"});
   }
   
 const token = jwt.sign(existuser,process.env.SECRET_KEY,{ expiresIn: "1hr"});
 res.send(token)
  }catch(err){

    console.log(err);
    res.status(500).send(err);
}
}