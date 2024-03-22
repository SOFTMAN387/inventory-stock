import express from 'express';
import {
  test,
  updateOrder,
  getAllOrders,
  getOrder,
  deleteOrder,
  createOrder
} from '../controllers/order.controller.js';
import { verifyToken } from '../middleware/verifyUser.js';
const router = express.Router();

//Orders routes starts here============================
router.get('/test', test);
router.get('/orderlist',getAllOrders);
router.get('/:id',verifyToken,getOrder);
router.post('/new-order',verifyToken,createOrder);
router.patch('/update/:id',verifyToken,updateOrder);
router.delete('/delete/:id', verifyToken, deleteOrder);
//Orders routes ends here============================


export default router;