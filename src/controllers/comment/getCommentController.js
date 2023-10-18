import Comment from "../../model/Comment";
export const getCommentController = async (req, res) => {
    const comment = await Comment.find().populate('post').populate('author');
    return res.status(200).json(comment);
}