import express from 'express';
import {getFeedPost,getUserPosts,likePost} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';
import router from './auth.js';

const routes = express.Router();

/*Reaad*/

router.get("/",verifyToken,getFeedPost);
routes.get("/:userId/posts",verifyToken,getUserPosts);


/*Update*/

router.patch('/:id/like',likePost);

export default router;
