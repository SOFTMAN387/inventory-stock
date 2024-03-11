import express from 'express';
import {
  test,
  loginUser,
  updateUser,
  getAllUsers,
  getUser,
  deleteUser,
  createUser,
  forgotPassword
} from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyUser.js';
const router = express.Router();

//users routes starts here============================
router.get('/', test);
router.get('/userlist',verifyToken,getAllUsers);
router.get('/:id',verifyToken,getUser);
router.post('/login',loginUser);
router.post('/register',verifyToken,createUser);
router.patch('/update/:id',verifyToken, updateUser);
router.patch('/forgot-password/:id',forgotPassword);
router.delete('/delete/:id', verifyToken, deleteUser);
//users routes ends here============================


export default router;