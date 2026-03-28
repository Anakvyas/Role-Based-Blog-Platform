import jwt from 'jsonwebtoken'
export const isAuthenticated = (req,res,next)=>{
    const token = req.cookie.token;
    if (!token) {
        return res.status(401).json({ message: "Not logged in" });
    }
    const decode = jwt.verify(token,process.env.SECRET_KEY);
    
    req.user = decode;
    next();
}