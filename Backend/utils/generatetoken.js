import jwt from 'jsonwebtoken'

export const generatetoken = (user)=>{
    const token = jwt.sign(
        {id:user._id,role:user.role}, //payload
        process.env.SECRET_KEY,     //secret key
        {expiresIn:"1d"}  // expiry
    )
    return token;
}