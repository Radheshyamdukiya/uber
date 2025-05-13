const dotenv=require("dotenv");
dotenv.config();

const express=require("express");
const cors=require('cors');
const app=express();
app.use(cors());
const connectToDb=require('./db/db');
connectToDb();
app.use(express.json());
app.use(express.urlencoded({extended:true})); 
const userRoutes=require('./routes/user.routes');
app.use('/users',userRoutes);


module.exports=app;