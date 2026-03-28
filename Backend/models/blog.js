import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
},{timestamps:true})

const Blog = mongoose.model('Blog',BlogSchema)
export default Blog;