const express=require("express");
const {connection}=require("./db");
const {userRouter}=require("./route/user.route");
const {postRouter}=require("./route/post.route");
const cors=require("cors");
const app=express();

app.use(express.json());
app.use(cors());
app.use("/users",userRouter);
app.use("/posts",postRouter);
app.get("/",(req,res)=>{
        res.send("Home Page");
})

app.listen(8080,async()=>{
        try{
                await connection;
                console.log("connected to db");
                console.log("aerver is runnig at port 8080");
        }catch(err){
                console.log(err);
        }
})
