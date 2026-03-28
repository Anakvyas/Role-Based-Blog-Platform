import mongoose from 'mongoose'
export const connectDB = async ()=>{
    try{
        if(!process.env.MONGO_URL){
            throw new Error('MONGO_URL is not defined');
        }
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected");
    }catch(err){
        console.log("error occured :: "+err);
        throw err;
    }

}
