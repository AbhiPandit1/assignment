import express from 'express';
import {
  loginUser,
  postUserDetail,
  signOut,
} from '../controller/UserController.js';
const router = express.Router();

router.route('/post/user').post(postUserDetail);
router.route('/login/user').post(loginUser);
router.route('/signOut').post(signOut);

export default router;
