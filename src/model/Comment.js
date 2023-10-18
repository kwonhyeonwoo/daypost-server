import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    text: { type: String, required: true },
    createAt: { type: String, required: true, default: Date.now, },
    post: {
        type: mongoose.Schema.ObjectId, rquired: true, ref: 'Post'
    },
    author: {
        type: mongoose.Schema.ObjectId, rquired: true, ref: 'User'
    }
})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;