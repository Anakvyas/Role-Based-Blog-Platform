import User from "../models/user.js";
import bcrypt from 'bcrypt';
import { generatetoken } from "../utils/generatetoken.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

const isProduction = process.env.NODE_ENV === 'production';
const cookieOptions = {
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
};

export const Signup = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body;
    const role = 'user';

    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new AppError('User already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(String(password),10);
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
        role
    });

    return res.status(201).json({
        success:true,
        message:"User created successfully",
        data:user,
    });
});

export const Login = asyncHandler(async (req,res)=>{
    const {email,password,role} = req.body;

    const user = await User.findOne({email,role});
    if(!user){
        throw new AppError("User not exists", 404);
    }
    
    const passwordcorrect = await bcrypt.compare(password,user.password);
    if(!passwordcorrect){
        throw new AppError('Wrong password', 401);
    }

    const token = generatetoken(user);
    res.cookie("token",token,cookieOptions);

    return res.status(200).json({
        success:true,
        message:"Login successful",
        token:token
    });
});

export const Logout = asyncHandler(async (req,res)=>{
    const token = req.cookies.token;
    if(!token){
        throw new AppError("Not logged in", 401);
    }

    res.cookie('token',"",{
        ...cookieOptions,
        expires:new Date(0)
    });

    return res.status(200).json({ success:true, message: "Logged out successfully" });
});

export const Me = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user.id).select('-password');

    if(!user){
        throw new AppError('User not found', 404);
    }

    return res.status(200).json({
        success:true,
        authenticated:true,
        user
    });
});
