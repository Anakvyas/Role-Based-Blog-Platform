import User from "../models/user.js";
import bcrypt from 'bcrypt';
import { generatetoken } from "../utils/generatetoken.js";

export const Signup = async(req,res)=>{
    try{
        const {username,email,password,role} = req.body;

        if(!username || !email || !password || !role){
            return res.status(400).json({sucsess:false , message: "data missing ! "});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                message:'User is already Exists',
                success:false
            });
        }  

        const hashedPassword = await bcrypt.hash(String(password),10);
        const user = await User.create({
            username,
            email,
            password:hashedPassword,
            role
        })

        return res.status(201).json({
            sucsess:true,
            message:"User created Succesfully",
            data :user,
        })

    }catch(err){
        console.log("error occured - "+err.message);
        return res.status(500).json({
            sucsess:false,
            message:'Internal Server Erorr'
        })
    }
}

export const Login = async(req,res)=>{
    try{
        const {email,password,role} = req.body;

        if(!email || !password || !role){
            return res.status(400).json({
                success:false,
                message: "data is missing!! "
            });
        }

        const user = await User.find({email,role});
        if(!user){
            return res.status(404).json({
                sucsess:false,
                messge:"User not exists",
            })
        }
        
        const passwordcorrect = bcrypt.compare(password,user.password);
        if(!passwordcorrect){
            return res.status(401).json({
                success:false,
                message:'wrong password'
            })
        }
        const token = generatetoken(user);
        res.cookie("token",token,{
            httpOnly:true,
        });

        return res.status(200).json({
                success:message,
                message:"login successful..",
                token:token
        })
    }catch(err){
        console.log("error occured - "+err.message);
        return res.status(500).json({
            sucsess:false,
            message:'Internal Server Erorr'
        })
    }
}

export const Logout = ()=>{
    try{
        const token = req.cookie.token;
        if(!token){
            return res.status(401).json({ message: "Not logged in" });
        }

        res.cookie('token',"",{
            httpOnly:true,
            expires:new Date(0)
        })
        res.status(200).json({ message: "Logged out successfully" });
    }catch(err){
        console.log("error occured - "+err.message);
        return res.status(500).json({
            sucsess:false,
            message:'Internal Server Erorr'
        })
    }
}