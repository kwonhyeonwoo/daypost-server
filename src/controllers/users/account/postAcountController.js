import User from "../../../model/User"

export const postAccountController = async (req, res) => {
    const {
        userName,
        email,
        userId,
        nickName,
        password,

    } = req.body;
    const avatarPath = req.file ? req.file.path : null;
    // 이메일,아이디 닉네임 DB 조회해서 유,무 확인
    const emailExists = await User.exists({ email });
    const userIdExists = await User.exists({ userId });
    const nickNameExists = await User.exists({ nickName });

    // 이메일 중복 검사
    if (emailExists) {
        return res.status(400).json({
            message: '중복 된 이메일 있습니다.'
        })
    }

    // 아이디 중복검사
    if (userIdExists) {
        return res.status(400).json({
            message: '중복 된 아이디 있습니다.'
        })
    }

    // 닉네임 중복검사
    if (nickNameExists) {
        return res.status(400).json({
            message: '중복된 닉네임 있습니다.'
        })
    }

    // 중복검사 통과 시 회원가입
    const user = await User.create({
        avatar: avatarPath, userName, email, userId, nickName, password
    });
    return res.json(user)
}