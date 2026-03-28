import jwt from 'jsonwebtoken'
import AppError from '../utils/AppError.js';
export const isAuthenticated = (req,res,next)=>{
    try{
        const token = req.cookies?.token;
        if (!token) {
            return next(new AppError("Not logged in", 401));
        }

        const decode = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decode;
        next();
    }catch(err){
        return next(new AppError("Invalid or expired token", 401));
    }
}
