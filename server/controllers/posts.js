import User from '../models/User.js';
import Post from '../models/post.js';

// Create

export const createPost = async (req, res) => {
    try {
      const { userId, description, picturePath } = req.body;
      const user = await User.findById(userId);
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        picturePath,
        likes: {},
        comments: [],
      });
      await newPost.save();
  
      const post = await Post.find();
      res.status(201).json(post);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  };

/* READ */

export const getFeedPost = async(req,res) => {
    try{
      const post = await Post.find();
      res.status(201).json(post);
    }catch(err) {
        res.status(404).json({message : err.message})
    }
}

export const getUserPosts = async(req,res) => {
    try{
        const {userId} =  req.params;
       const post = await Post.find({ userId});
       res.status(200).json(post)
    }catch (err) {
        res.status(404).json({message : err.message})
    }
}

/* update*/

export const likePost = async(req,res) => {
    try{
        const {id} = req.params;
        const{userId} = req.body;
        const post =  await Post.findById(id);
        const isLiked =  post.likes.get(userId);

        if(isLiked) {
            post.likes.delete(userId);
            // Like: The code adds a user ID to the post.likes Map, indicating a "like" on the post.


        } else {
            post.likes.set(userId , true);
            // Unlike: The code removes the user ID from the post.likes Map, indicating an "unlike" action on the post. and set it to true
        }
 
        const updatedPost =  await Post.findByIdAndUpdate(
            id,
            {likes : post.likes},
            {new : true}
        )


        res.status(200).json(updatedPost);
    }catch(err) {
        res.status(404).json({ message : err.message})
    }
}