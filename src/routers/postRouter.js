import express from "express";
import { postController } from "../controllers/post/postController";
import { getPostController } from "../controllers/post/getPostController";
import { searchPostController } from "../controllers/post/searchPostController";
import multer from "multer";

const postRouter = express.Router();
const upload = multer({
    dest: 'uploads/'
})
postRouter.post('/upload', upload.single('image'), postController);
postRouter.get('/posts', getPostController);
postRouter.get('/search', searchPostController);
export default postRouter