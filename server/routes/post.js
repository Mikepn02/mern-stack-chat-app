import express from 'express';
import {getFeedPosts,getUserPosts,likePost} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';
import router from './auth.js';

const routes = express.Router();

/*Reaad*/

router.get("/",verifyToken,getFeedPosts);
routes.get("/:userId/posts",verifyToken,getUserPosts);


/*Update*/

router.patch('/:id/like',verifyToken,likePost);

export default router;
