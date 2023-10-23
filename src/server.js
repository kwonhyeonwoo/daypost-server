import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './routers/userRouter';
import MongoStore from "connect-mongo";
import session from 'express-session';
import postRouter from './routers/postRouter';
import commentRouter from './routers/commentRouter';
const app = express();
const logger = morgan('dev');

app.use(logger);
app.use(express.json());



app.use(cors({
    origin: 'http://localhost:3000',  // 여기에 프론트엔드 주소를 입력하세요.
    credentials: true,
    withCredentials: true

}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const sessionObj = {
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 // 예: 24시간
    },

    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
    })
}
app.use('/uploads', express.static('uploads'))

app.use(session(sessionObj))




app.get('/check', (req, res) => {
    if (req.session.loggedIn) {
        // 로그인하면 session 정보 저장

        // session 정보로 로그인 유,무 체크
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        // 로그인 안 되어있으면 loggedIn false.
        res.json({ loggedIn: false, });
    }
});

app.use('/user', userRouter)
app.use('/comment', commentRouter)
app.use('/post', postRouter)
export default app;
