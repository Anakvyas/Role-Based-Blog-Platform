import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true,
        trim:true
    },
    email : {
        type : String,
        required :true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    role : {
        type:String,
        enum :['user','admin'],
        default:'user'
    }
})

const User = mongoose.model('User',UserSchema);
export default User;