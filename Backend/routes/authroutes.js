import express from 'express';
import { Signup,Login,Logout,Me } from '../controllers/authContoller.js';
import { isAuthenticated } from '../middlewares/isauthenticate.js';
import validate from '../middlewares/validate.js';
import { loginSchema, signupSchema } from '../validations/authValidation.js';

const authrouter = express.Router();

authrouter.post('/signup', validate(signupSchema), Signup);
authrouter.post('/login', validate(loginSchema), Login);
authrouter.post('/logout',Logout);
authrouter.get('/me',isAuthenticated,Me);

export default authrouter;
