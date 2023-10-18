import express from "express";
import { postAccountController } from "../controllers/users/account/postAcountController";
import { loginController } from "../controllers/users/login/loginController";
import multer from "multer";
import { userEditController } from "../controllers/users/UserEdit/userEditController";
import { userInfoController } from "../controllers/users/userInfoController";

const userRouter = express.Router();
const upload = multer({
    dest: 'uploads/'
})
userRouter.post('/edit', upload.fields([{ name: 'avatar' }, { name: 'backImg' }]), userEditController);
userRouter.post('/account', upload.single('avatar'), postAccountController);
userRouter.post('/login', loginController);
userRouter.get('/infor', userInfoController);

export default userRouter;