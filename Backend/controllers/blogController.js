import Blog from "../models/blog.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getBlogs = asyncHandler(async (req,res)=>{
    const blogs = await Blog.find().sort({createdAt:-1}).populate('author','username email role');

    return res.status(200).json({
        success:true,
        message:'Blogs fetched successfully',
        blogs
    });
});

export const createBlog = asyncHandler(async (req,res)=>{
    const { title, text } = req.body;

    const blog = await Blog.create({
        title,
        text,
        author:req.user.id
    });

    return res.status(201).json({
        success:true,
        message:'Blog created successfully',
        blog
    });
});

export const updateBlog = asyncHandler(async (req,res)=>{
    const { id } = req.params;
    const { title, text } = req.body;

    const blog = await Blog.findByIdAndUpdate(
        id,
        { title, text },
        { new:true, runValidators:true }
    );

    if(!blog){
        throw new AppError('Blog not found', 404);
    }

    return res.status(200).json({
        success:true,
        message:'Blog updated successfully',
        blog
    });
});

export const deleteBlog = asyncHandler(async (req,res)=>{
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);

    if(!blog){
        throw new AppError('Blog not found', 404);
    }

    return res.status(200).json({
        success:true,
        message:'Blog deleted successfully'
    });
});
