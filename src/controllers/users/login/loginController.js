import User from "../../../model/User";
import bcrypt from 'bcrypt';

export const loginController = async (req, res) => {
    const { userId, password } = req.body;
    const user = await User.findOne({ userId });
    // userId 없을 경우
    if (!user) {
        return res.status(400).json({
            message: '등록되지 않은 아이디 입니다.'
        })
    }

    // 암호화 비밀번호 compare로 체크
    const passwordMatch = await bcrypt.compare(password, user.password);

    // 암호화 체크 완료
    if (passwordMatch) {
        console.log('login user', user)
        // sessoion에 loggedIn , user 객체 만들어서 저장
        req.session.loggedIn = true;
        req.session.user = user;
        req.session.save();
    } else if (!passwordMatch) {
        // 비밀번호 일치하지 않을 경우
        return res.status(400).json({
            message: '비밀번호가 일치하지 않습니다.'
        })
    }
    return res.status(200).json(user);
}
