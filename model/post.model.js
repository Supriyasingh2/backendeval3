const mongoose=require("mongoose");
const postSchema=mongoose.Schema({
        title:String,
        body:String,
        device:{
                type:String,
                enum:["Laptop","Tablet","Mobile"]
        },
        no_of_comments:Number,
},{
        versionKey:false,
});

const PostModel=mongoose.model("post",postSchema);

module.exports={
        PostModel
};