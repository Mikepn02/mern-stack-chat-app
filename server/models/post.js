import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId: {
        type:String,
        required: true
    },
    firstName: {
        type:String,
        required: true
    },
    LastName: {
        type:String,
        required: true
    },
    Location:String,
    description: String,
    picturePath: String,
    userPicurePath: String,
    likes: {
        type: Map,
        of: Boolean
    },
    comments: {
        type: Array,
        default: []
    }

} , {timeStamps: true});
const Post = mongoose.model("Post",postSchema)
export default Post