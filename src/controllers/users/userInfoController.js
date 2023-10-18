import User from "../../model/User"

export const userInfoController = async (req, res) => {
    try {
        const users = await User.find().populate('posts');

        return res.status(200).json({ users })
    } catch (error) {
        console.log(error);
    }

}