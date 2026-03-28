import express from 'express';
import { createBlog, deleteBlog, getBlogs, updateBlog } from '../controllers/blogController.js';
import { isAuthenticated } from '../middlewares/isauthenticate.js';
import { isAdmin } from '../middlewares/isadmin.js';
import validate from '../middlewares/validate.js';
import { blogSchema } from '../validations/blogValidation.js';

const blogrouter = express.Router();

blogrouter.get('/',isAuthenticated,getBlogs);
blogrouter.post('/',isAuthenticated,isAdmin,validate(blogSchema),createBlog);
blogrouter.put('/:id',isAuthenticated,isAdmin,validate(blogSchema),updateBlog);
blogrouter.delete('/:id',isAuthenticated,isAdmin,deleteBlog);

export default blogrouter;
