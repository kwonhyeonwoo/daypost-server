import express from "express";
import { postController, postEditController } from "../controllers/post/postController";
import { getPostController } from "../controllers/post/getPostController";
import multer from "multer";
import { deleteController, searchController } from "../controllers/postController";

const postRouter = express.Router();
const upload = multer({
    dest: 'uploads/'
})
postRouter.post('/upload', upload.single('image'), postController);
postRouter.post('/edit', upload.single('image'), postEditController);
postRouter.get('/posts', getPostController);
postRouter.get('/search', searchController);
postRouter.delete('/delete/:id', deleteController);
export default postRouter;