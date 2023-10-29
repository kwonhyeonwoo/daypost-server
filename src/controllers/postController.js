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

export const searchController = async (req, res) => {
    const query = req.query.description;
    console.log('quer', query);
    console.log('quququ', req.query)

    const results = await Post.find({ description: { $regex: query, $options: 'i' } });
    console.log('results', results)
    return res.status(200).json(results);
}