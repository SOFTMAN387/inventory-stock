import express from 'express';
import {
  test,
  updateOrder,
  getAllOrders,
  getOrder,
  deleteOrder,
  createOrder
} from '../controllers/order.controller.js';
import { verifyToken,isAdmin } from '../middleware/verifyUser.js';
const router = express.Router();

//Orders routes starts here============================
router.get('/test', test);
router.get('/orderlist',verifyToken,getAllOrders);
router.get('/:id',verifyToken,getOrder);
router.post('/new-order',verifyToken,createOrder);
router.patch('/update/:id',verifyToken,updateOrder);
router.delete('/delete/:id', verifyToken,isAdmin,deleteOrder);
//Orders routes ends here============================


export default router;