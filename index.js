const express=require("express");
const employeerouter=require("./EmployeeRouter/router");
const mango =require("./connect");
const dotenv=require("dotenv");
const employeeregsiter=require("./EmployeeRouter/registerrouter");
const auth =require("./Employeemodule/authmodules")
const cors=require("cors")



const app =express();
app.use(express.json())


dotenv.config();
mango.connect();
app.use(express.json())
mango.connect();
app.use(cors());




app.use("/register",employeeregsiter);


app.use("/",auth.authuser)


app.use("/employee",employeerouter);

app.listen(process.env.PORT); 