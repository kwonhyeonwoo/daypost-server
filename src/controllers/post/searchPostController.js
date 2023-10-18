import Post from "../../model/Post"

// 게시물 검색
export const searchPostController = async (req, res) => {
    const searchQuery = req.query.description; // 프론트엔드에서 보낸 검색어
    if (typeof searchQuery !== "string") {
        return res.status(400).json({ error: "Invalid search term." });
    }
    const results = await Post.find({ description: { $regex: searchQuery, $options: 'i' } }).populate('author');
    return res.status(200).json(results);
}