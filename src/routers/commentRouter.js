import express from 'express';
import { createCommentController } from '../controllers/comment/createCommentController';
import { getCommentController } from '../controllers/comment/getCommentController';

const commentRouter = express.Router();

commentRouter.post('/create', createCommentController)
commentRouter.get('/infor', getCommentController);
export default commentRouter; 