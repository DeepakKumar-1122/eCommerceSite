import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addItemToCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { product, name, quantity, price, image } = req.body;
    const itemExists = user.cart.find(
      (item) => item.product.toString() === product
    );

    if (itemExists) {
      itemExists.quantity = quantity;
    } else {
      const newItem = {
        product,
        name,
        quantity,
        price,
        image,
      };
      user.cart.push(newItem);
    }

    await user.save();
    res.status(201).json(user.cart);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getUserCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json(user.cart);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeItemFromCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== req.params.id
    );
    await user.save();
    res.json(user.cart);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Clear user cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.cart = [];
    await user.save();
    res.json({ message: 'Cart cleared' });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { addItemToCart, getUserCart, removeItemFromCart, clearCart };
