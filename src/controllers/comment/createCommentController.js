import Post from "../../model/Post";
import User from "../../model/User";
import Comment from "../../model/Comment"
export const createCommentController = async (req, res) => {
    try {
        const {
            body: { text, id },
            session: {
                user: { _id }
            }
        } = req;
        const post = await Post.findById(id).populate('comments');
        const user = await User.findById(_id).populate('comments');
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }
        const comment = await Comment.create({
            text,
            post: id,
            author: _id,
        });
        post.comments.push(comment);
        user.comments.push(comment);
        await user.save();
        await post.save();
        console.log('comment', comment)
        return res.status(201).json(comment);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}



