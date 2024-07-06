import express from 'express';
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { addItemToCart, getUserCart, removeItemFromCart, clearCart } from '../controllers/cartController.js';

router.route('/').post(protect, addItemToCart).get(protect, getUserCart).delete(protect, clearCart);
router.route('/:id').delete(protect, removeItemFromCart);

export default router;