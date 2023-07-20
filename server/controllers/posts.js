import User from '../models/User.js';
import Post from '../models/post.js';

// Create

export const createPost = async(req,res) => {
    try{

        const {userId,description,picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName : user.firstName,
            lastName: user.lastName,
            location,
            userPicturePath,
            picturePath: user.picturePath,
            likes:{
                "someid":true
            },
            comments: []

        })
        await newPost.save();
        const post = await Post.find()

    }catch(err) {
        res.status(409).json({message: err.message});
    }
}