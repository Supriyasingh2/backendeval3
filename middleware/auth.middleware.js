const jwt=require("jsonwebtoken");
const {userModel}=require("../model/user.model");
const {blacklistModel}=require("../blacklist");
const {postModel}=require("../model/post.model");
const auth=async(req,res,next)=>{
        const token =req.headers.authorization?.split(" ")[1];
        if(await blacklistModel.findOne({token})){
                return res.json({msg:"you have been logged out"})
        }
        if(token){
                try{
                        const decoded=jwt.verify(token,"masai");
                        if(decoded){
                                const {userId}=decoded;
                                const user=await userModel.findOne({_id:userId})
                                req.body.userId=decoded.userId
                                next();
                        }else{
                                res.json({msg:"you are not authorized"});
                        }
                }catch(err){
                        res.json({error:err});
                }
        }
};
module.exports={
        auth
}