const mongo=require("../connect");
const {ObjectId}=require("mongodb")

module.exports.getEmployee=async(req,res,next)=>{
    try{
       const empdata=await mongo.selectdb.collection("employee").find().toArray();
    res.send(empdata)
    }catch(err){
        console.error(err);
        res.status(500).send(err); 
      }
   

}

module.exports.updateEmployee=async(req,res,next)=>{
    try{
    const id=req.params.id;
  const update= await mongo.selectdb.collection("employee").
    findOneAndUpdate({_id:ObjectId(id)},{set :{...req.body}},{returnDocument :"after"})
    res.send(update)
  }catch(err){
    console.error(err);
    res.status(500).send(err); 
  }
}



module.exports.createEmployee=async (req,res,next)=>{
  try{
   const responce= await mongo.selectdb.collection("employee")
   .insertOne(req.body);
   res.send(responce)
  }catch(err){
    console.error(err);
    res.status(500).send(err); 
  }

}

module.exports.deleteEmployee=async(req,res,next)=>{
    try{
    const id=req.params.id;
     const deletedata = await mongo.selectdb
     .collection("employee").remove({_id:Object(id)})
    res.send(deletedata);
    }catch(err){
        console.error(err);
        res.status(500).send(err); 
      }
    
    }

