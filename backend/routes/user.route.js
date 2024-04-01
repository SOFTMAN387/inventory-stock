import express from 'express';
import {
  test,
  loginUser,
  updateUser,
  getAllUsers,
  getUser,
  deleteUser,
  createUser,
  forgotPassword,
  updateAdminRole,
  verifyEmail
} from '../controllers/user.controller.js';
import { verifyToken,isAdmin } from '../middleware/verifyUser.js';
const router = express.Router();

//users routes starts here============================
router.get('/', test);
router.get('/userlist',verifyToken,getAllUsers);
router.get('/:id',verifyToken,getUser);
router.post('/login',loginUser);
router.post('/register',isAdmin,createUser);
router.patch('/update/:id',verifyToken,isAdmin, updateUser);
router.patch('/update-role/:id',verifyToken,isAdmin, updateAdminRole);
router.post('/verify-email',verifyEmail);
router.patch('/new-password/:id',forgotPassword);
router.delete('/delete/:id', verifyToken, deleteUser);
//users routes ends here============================


export default router;