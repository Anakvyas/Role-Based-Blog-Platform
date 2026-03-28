import Joi from 'joi';

export const blogSchema = Joi.object({
    title: Joi.string().trim().min(3).max(120).required(),
    text: Joi.string().trim().min(10).required(),
});
