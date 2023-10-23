import Post from "../model/Post"

export const deleteController = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.json(post);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}
