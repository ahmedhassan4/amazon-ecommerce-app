import Cart from "../models/cartModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Product from "../models/productModel.js";
import CartItem from "../models/cartItemModel.js";
import User from "../models/userModel.js";

export const getAllCarts = catchAsync(async (req, res, next) => {
  const carts = await Cart.find();
  //   const carts = await Cart.find().populate("user");
  res.status(200).json({
    status: "success",
    data: {
      carts,
    },
  });
});

export const getCart = catchAsync(async (req, res, next) => {
  //   const cart = await Cart.findById(req.params.id).populate("user");
  const cart = await Cart.findById(req.params.id);

  if (!cart) {
    return next(
      new AppError(`No Cart Found with this id : ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

export const createCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

export const deletecart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findByIdAndDelete(req.params.id);

  if (!cart) {
    return next(
      new AppError(`No Cart Found with this id : ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});

export const updateCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!cart) {
    return next(
      new AppError(`No Cart Found with this id : ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

export const addToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.User._id;

  // Find the product with id
  const product = await Product.findById(productId);
  if (!product) {
    return next(
      new AppError(`There is no product found with this Id ${productId}`)
    );
  }

  // Find the user's cart or create a new one
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId });
  }

  // Check if the product is already in the cart
  let cartItem = await CartItem.findOne({ cart: cart_id, product: productId });
  if (cartItem) {
    cartItem.quantity += quantity;
    await cartItem.save();
  } else {
    // Otherwise, create a new cart item
    cartItem = await CartItem.create({
      product: productId,
      quantity,
      cart: cart._id,
    });

    // Add the new item to the cart's items array
    cart.items.push(cartItem._id);
  }

  cart.total += product.price * quantity;
  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Product added to cart",
    data: {
      cart,
    },
  });
});
