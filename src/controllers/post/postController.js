import Post from "../../model/Post";
import User from "../../model/User";

export const postController = async (req, res) => {
    const {
        description
    } = req.body;
    const { _id } = req.session.user;
    const imagePath = req.file ? req.file.path : null;

    try {
        const post = await Post.create({
            description,
            image: imagePath,
            author: _id,
        });
        const user = await User.findById(_id);

        // user 없으면 게시물 생성 막음
        if (!user) return res.status(400).json({ message: '로그인 후 이용 바랍니다.' });

        //  session user에 posts 객체안에 push
        req.session.user.posts.push(post);

        // User 스키마 posts 필드에 post push
        user.posts.push(post._id);
        await user.save();
        return res.status(200).json(post);
    } catch (error) {
        console.error("Error occurred:", error); // 오류 출력
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const postEditController = async (req, res) => {
    const { description, _id } = req.body;
    const image = req.file ? req.file.path : null;
    const updateData = {};
    if (description) updateData.description = description;
    if (image) updateData.image = image;
    const post = await Post.findOneAndUpdate(
        { _id: _id },
        updateData,
        { new: true }
    )
    console.log('post', post)
    return res.status(200).json(post);
}