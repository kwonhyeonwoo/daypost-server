import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    image: String,
    description: String,
    hashtags: [{ type: String }],
    createAt: { type: Date, default: Date.now, required: true },
    like: { type: Number, default: 0 },
    author: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Comment'
    }]
})


const Post = mongoose.model('Post', postSchema)

export default Post;