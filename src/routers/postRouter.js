import express from "express";
import { postController, postEditController } from "../controllers/post/postController";
import { getPostController } from "../controllers/post/getPostController";
import { searchPostController } from "../controllers/post/searchPostController";
import multer from "multer";
import { deleteController } from "../controllers/postController";

const postRouter = express.Router();
const upload = multer({
    dest: 'uploads/'
})
postRouter.post('/upload', upload.single('image'), postController);
postRouter.post('/edit', upload.single('image'), postEditController);
postRouter.get('/posts', getPostController);
postRouter.get('/search', searchPostController);
postRouter.delete('/delete/:id', deleteController);
export default postRouter