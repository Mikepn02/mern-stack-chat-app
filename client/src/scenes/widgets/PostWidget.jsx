import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined

} from "@mui/icons-material";
import {
    Box,
    IconButton,
    Divider,
    Typography,
    useTheme
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from '../../components/friend';
import WidgetWrapper from "components/widgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const [isComments, setIsComments] = useState(false)
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length // this is to  increase the number of likes
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        console.log(postId)
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: loggedInUserId })
        })
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }))
    } 

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{ mt: "1rem" }}>{description}</Typography>
            {picturePath && (
                <img
                    width="100%"
                    crossOrigin="anonymous"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "o.75rem", marginTop: "0.75rem" }}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>
                    <FlexBetween gap="0.3rem">
                    <IconButton onClick={() => setIsComments()}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>
                <IconButton><ShareOutlined /></IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment,i) => (
                        <Box key={`${name}-${i}`}>
                         {/* key={`${name}-${i}`} this is to provide a unique index */}
                         <Divider />
                         <Typography sx={{color: main, m:"0.5rem",pl:"1rem"}}>{comment}</Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper>
    )

}
export default PostWidget;