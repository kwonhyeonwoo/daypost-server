import Comment from "../../model/Comment";
export const getCommentController = async (req, res) => {
    const comment = await Comment.find().populate('post').populate('author');
    console.log('comment', comment)
    return res.status(200).json(comment);
}