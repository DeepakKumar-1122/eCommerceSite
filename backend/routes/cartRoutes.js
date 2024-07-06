import express from 'express';
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { addItemToCart, getUserCart, removeItemFromCart } from '../controllers/cartController.js';

router.route('/').post(protect, addItemToCart).get(protect, getUserCart);
router.route('/:id').delete(protect, removeItemFromCart);

export default router;