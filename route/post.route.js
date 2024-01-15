const express=require("express");
const {auth}=require("../middleware/auth.middleware");

const {PostModel}=require("../model/post.model");

const postRouter=express.Router();

postRouter.use(auth);

postRouter.post("/add",async(req,res)=>{
        try{
                const post=new PostModel(req.body);
                await post.save();
                res.status(200).json({msg:"A new post has been added"});
        }catch(err){
                res.status(400).json({error:arr});
        }
});

postRouter.get("/",async(req,res)=>{
        try{
                const posts=await PostModel.find({
                        userID:req.body.userID
                });
                res.status(200).json({post:posts});
        }catch(err){
                res.status(400).json({error:err});
        }
});

postRouter.patch("/update/:postID",async(req,res)=>{
        const {postID}=req.params;
        const payload=req.body;
       
        try{
                const post =await PostModel.findOne({_id:postID});
                if(post.userId==req.body.userId){
                        await PostModel.findIdAndUpdate({
                                _id:postID
                        },payload);
                        res.status(200).json({msg:"post updated"})
                }else{
                        res.status(200).json({msg:"you are not authorized"});
                }
        }catch(err){
                res.status(400).json({error:err});
        }
});

postRouter.delete("/delete/:postID",async(req,res)=>{
        const {postID}=req.params;
        const payload=req.body;
       
        try{
                const post =await PostModel.findOne({_id:postID});
                if(post.userId==req.body.userId){
                        await PostModel.findIdAndDelete({
                                _id:postID
                        },payload);
                        res.status(200).json({msg:"post deleted"})
                }else{
                        res.status(200).json({msg:"you are not authorized"});
                }
        }catch(err){
                res.status(400).json({error:err});
        }
});
module.exports={
        postRouter
}