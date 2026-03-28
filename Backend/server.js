import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import  {connectDB}  from './config/db.js';
import authrouter from './routes/authroutes.js';


const app = express();

// db connection
await connectDB();

app.use(express.json())
//routes
app.use('/api/auth',authrouter);



const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log("Server is running...")
})
