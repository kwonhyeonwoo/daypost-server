import Post from "../../../model/Post";
import User from "../../../model/User";

export const userEditController = async (req, res) => {
    const {
        nickName,
        statusMsg,
        location,
        webSite
    } = req.body;
    const avatar = req.files.avatar ? req.files.avatar[0] : undefined;
    const backImg = req.files.backImg ? req.files.backImg[0] : undefined;
    const _id = req.session.user._id
    const updateData = {};

    // 닉네임 중복검사
    if (nickName && (nickName !== req.session.user.nickName)) {
        const nickNameExists = await User.exists({ nickName, _id: { $ne: _id } });
        if (nickNameExists) {
            return res.status(400).json({
                message: '중복된 닉네임이 있습니다.'
            });
        }
    }
    // body값이 존재 할 경우에만 updateData에 넣음
    if (nickName) updateData.nickName = nickName;
    if (statusMsg) updateData.statusMsg = statusMsg;
    if (location) updateData.location = location;
    if (webSite) updateData.webSite = webSite;
    if (avatar) {
        updateData.avatar = avatar.path;
    }
    if (backImg) {
        updateData.backImg = backImg.path;
    };

    const posts = await Post.find().populate('author');
    const updateUser = await User.findOneAndUpdate(
        { _id: _id },
        updateData,
        { new: true }
    );
    // 세션 업데이트
    req.session.user = updateUser;
    req.session.user.posts = posts;
    console.log('posts', posts)
    return res.json(updateUser);
}