import express from 'express';
import {
  test,
  updateOrder,
  getAllOrders,
  getOrder,
  deleteOrder,
  createOrder,
  updateOrderStatus
} from '../controllers/order.controller.js';
import { verifyToken,isAdmin } from '../middleware/verifyUser.js';
const router = express.Router();

//Orders routes starts here============================
router.get('/test', test);
router.get('/orderlist',getAllOrders);
router.get('/:id',verifyToken,getOrder);
router.post('/new-order',verifyToken,createOrder);
router.patch('/update/:id',verifyToken,updateOrder);
router.patch('/update-order-status/:id',verifyToken,updateOrderStatus);
router.delete('/delete/:id', verifyToken,isAdmin,deleteOrder);
//Orders routes ends here============================


export default router;