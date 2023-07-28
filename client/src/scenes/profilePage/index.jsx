import { Box, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/friendListWidgets";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/postsWidgets";
import UserWidget from "scenes/widgets/userWidgets";

const ProfilePage = () => {
    const [user, setUser] = useState(null)
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json();
    }

    useEffect(() => {
        getUser();
    }, []);

    if (!user) return null;

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="center"
            >

                <Box m="2rem 0" />
                <FriendListWidget userId={userId} />

                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={userId} picturePath={user.picturePath} />
                </Box>
                <Box flexBasis={isNonMobileScreens ? "42%" : undefined} mt={isNonMobileScreens ? undefined : "2rem"}>
                    <MyPostWidget picturePath={user.picturePath} />
                    <PostsWidget userId={userId} />
                </Box>
            </Box>
        </Box>
    )
}

export default ProfilePage