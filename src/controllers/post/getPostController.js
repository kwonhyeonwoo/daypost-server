import Post from "../../model/Post"
import User from "../../model/User";

export const getPostController = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    model: 'User',
                },

            })

        return res.json(posts);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch posts' });
    }
}
