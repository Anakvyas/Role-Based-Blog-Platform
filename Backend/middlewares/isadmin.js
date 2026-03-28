import AppError from "../utils/AppError.js";

export const isAdmin = (req,res,next)=>{
    const role = req.user.role
    if(role !== 'admin'){
        return next(new AppError("Admin only", 403));
    }
    next();
}
