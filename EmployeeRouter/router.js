const express=require("express");
const router=express.Router();
const empmodule=require("../Employeemodule/module")


router.get("/get",empmodule.getEmployee);
router.post("/create",empmodule.createEmployee);
router.put("/update/:id",empmodule.updateEmployee);
router.delete("/delete/:id",empmodule.deleteEmployee);


module.exports=router;