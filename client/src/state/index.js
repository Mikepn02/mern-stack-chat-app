import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   mode: "Light",
   user: null,
   token: null,
   posts : [],
}

export const  authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ?  "dark" : "light";
        },
        setLogin : (state ,action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state , action) => {
            if(state.user) {
                state.user.friends = action.payload.friends;

            }else {
                console.error("User friends noe-existent :(")
            }
        },
        setPosts : (state,action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPost = state.posts.map((post) => {
                if (post._id === action.payload.post_id) return action.payload.post;
                // we check if the post id match with the id entered then  return updated the post

            return post;

            });
            state.post =  updatedPost
        }
        
    }
})
// The "payload" is a property within the action object that contains the data associated with the action

//slice is used to combine reducers in react
//reducer are function that modify states


export const {setMode , setLogin , setLogout , setFriends , setPosts ,setPost } =  authSlice.actions;
export default authSlice.reducer;