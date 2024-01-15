const express= require("express");
const bcrypt =require("bcrypt");
const {UserModel}=require("../model/user.model");
const {blacklistModel}=require("../blacklist");
const userRouter=express.Router();

const jwt=require("jsonwebtoken");
/*
userRouter.post("/register",async(req,res)=>{
       
        const {name,email,gender,password,age,city}=req.body;
        try{
                 bcrypt.hash(password,12,async(err,hash)=>{
                        if(err){
                                res.status(200).json({errpr:err});
                        }else{
                                const user=new UserModel({name,email,password:hash,age,city,gender});
                                await user.save();
                                res.status(200).json({mag:"user registered successfully"});
                        }
                });
        }catch{
                res.status(400).json({error:err});
        }
});

*/
userRouter.post("/register",async(req,res)=>{
        const{name,email,gender,age,city,password}=req.body;
        try{
                const user=await UserModel.findOne({email:email});
                console.log(user);
                if(user){
                        return res.status(400).json({msg:"user is alreday exists"});
                }
                bcrypt.hash(password,5,async(err,hash)=>{
                        if(err){
                                res.status(200).json({error:err});
                        }else{
                                const user= await new UserModel({
                                        name,email,gender,city,password:hash,age
                                });
                                await user.save();
                                console.log(user);
                                res.status(200).json({
                                        msg:"the new user has been registered"
                                });
                        }
                });
        }catch(err){
                res.status(400).json({error:err})
        }
})
userRouter.post("/login",async(req,res)=>{
        const {email,password}=req.body;
        try{
                const user=await UserModel.findOne({email});
                if(user){
                bcrypt.compare(password,user.password,(err,result)=>{
                        if(result){
                                const token=jwt.sign({userId:user._id,name:user.name},"masai",{expiresIn:"7d"});
                                res.status(200).json({msg:"Logged in",token});
                        }else{
                                res.status(200).json({error:err});
                        }
                });
        }
        }catch(err){
                res.status(400).json({error:err});
        }
});

userRouter.get("/logout",async(req,res)=>{
        const token =req.headers.authorization?.split(" ")[1];
        try{
                const blacklist=new blacklistModel({token});
                await blacklist.save();
                res.status(200).json({msg:"user has been logged out ."});
        }catch(err){
                res.status(400).json({error:err});
        }
});
module.exports={
        userRouter
}