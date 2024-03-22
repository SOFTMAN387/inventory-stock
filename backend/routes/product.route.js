import express from 'express';
import {
  test,
  updateProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  createProduct
} from '../controllers/product.controller.js';
import { verifyToken } from '../middleware/verifyUser.js';
const router = express.Router();

//Products routes starts here============================
router.get('/test', test);
router.get('/productlist',getAllProducts);
router.get('/:id',verifyToken,getProduct);
router.post('/new-product',verifyToken,createProduct);
router.patch('/update/:id',verifyToken,updateProduct);
router.delete('/delete/:id', verifyToken, deleteProduct);
//Products routes ends here============================


export default router;