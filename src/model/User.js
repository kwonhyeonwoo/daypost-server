import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const userSchema = mongoose.Schema({
    avatar: String,
    backImg: String,
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userId: { type: String, required: true, unique: true },
    nickName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    statusMsg: String,
    location: String,
    webSite: String,
    posts: [{
        type: mongoose.Schema.ObjectId, required: true, ref: 'Post'
    }],
    comments: [{
        type: mongoose.Schema.ObjectId, required: true, ref: 'Comment'
    }]
})


// Mongoose의 pre메소드는 `Register Controller`의 save메소드가 실행되기 전에 실행.
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 5)
    } else {
        next();
    }
})

const User = mongoose.model('User', userSchema);


export default User;