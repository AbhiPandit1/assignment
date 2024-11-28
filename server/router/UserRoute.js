import express from 'express';
import { postUserDetail } from '../controller/UserController.js';
const router = express.Router();

router.route('/post/user').post(postUserDetail);

export default router;
