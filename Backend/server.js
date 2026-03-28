import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import  {connectDB}  from './config/db.js';
import authrouter from './routes/authroutes.js';
import blogrouter from './routes/blogroutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import accessLogStream from './utils/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import AppError from './utils/AppError.js';

const app = express();

// db connection
await connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials:true,
}));

// routes
app.use('/api/v1/auth', authrouter);
app.use('/api/v1/blogs', blogrouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((req, res, next) => {
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
});
app.use(errorHandler);


const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
