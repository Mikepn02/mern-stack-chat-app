import {
     PersonAddOutlined,
     PersonRemoveOutlined
 } from "@mui/icons-material";
 import { 
    Box,
    IconButton,
    Typography,
    useTheme

} from "@mui/material";
import { useDispatch ,useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./userImage";
import { useNavigate } from "react-router-dom";

const Friend = ({friendId , name , subtitle , userPicturePath}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.friends);

    const {palette} = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark  = palette.primary.dark
    const main = palette.neutral.main;
    const medium = palette.neutral.medium

    const isFriend = friends.find((friend) => friend.id === friendId);
    const patchFriend = async() => {
        const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`,{
            method:'PATCH',
            headers: `Bearer ${token}`,
            "Content-Type":"application/json"
        });
        const data  = await response.json();
    };
    return (
        <FlexBetween>
            <FlexBetween gap="1rem"> 
                 <UserImage image={userPicturePath} size="55px" />
                 <Box 
                 onClick={() => {
                    navigate(`/profile/${friendId}`);
                    navigate(0); // thos for refreshing the page
                
                }}
                 >
                    <Typography
                    color={main}
                    variant="h5"
                    fontWeight="500"
                    sx={{
                        "&:hover":{
                            cursor: "pointer",
                            color: palette.primary.light
                        }
                    }}
                    >{name}</Typography>
                    <Typography color={medium} fontSize="0.75rem">{subtitle}</Typography>
                 </Box>
            </FlexBetween>
            <IconButton 
            onClick={() => patchFriend()}
            sx={{backgroundColor: primaryLight,p:"0.6rem"}}
            >{isFriend ? (
                <PersonRemoveOutlined sx={{color:primaryDark}} />
            ): (
                <PersonAddOutlined  sx={{color: primaryDark}}/>
            )}
            </IconButton>
        </FlexBetween>
    )
}
export default Friend;