import express from 'express';
import { Signup,Login,Logout } from '../controllers/authContoller.js';

const authrouter = express().router;

authrouter.post('/signup',Signup);
authrouter.post('/login',Login);
authrouter.post('/logout',Logout)

export default authrouter;