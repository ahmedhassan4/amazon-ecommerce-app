import Cart from "../models/cartModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Product from "../models/productModel.js";
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

export const addToCart = catchAsync(async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    next(new AppError("Product not founded!", 404));
  }
  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = await Cart.create({ userId: req.user.id, items: [] });
  } else {
    const cartItem = cart.items.find(
      (item) => item.productId.toString() === productId.toString()
    );

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  }

  cart.total = cart.items.reduce((acc, item) => {
    return acc + item.quantity * product.price;
  }, 0);

  await cart.save();

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});
