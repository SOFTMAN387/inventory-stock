import express from 'express';
import {
  test,
//   updateUser,
//   deleteUser,
  createUser
} from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyUser.js';
const router = express.Router();

router.get('/', test);
router.post('/register',createUser);
// router.post('/update/:id', verifyToken, updateUser);
// router.delete('/delete/:id', verifyToken, deleteUser);

export default router;