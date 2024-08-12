import Product from "../models/productModel.js";
import APIFeature from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getNewReleasesProducts = catchAsync(async (req, res, next) => {
  const recentlyReleasedProducts = new Date();
  const recentReleasedDuration = 2;
  recentlyReleasedProducts.setDate(
    recentlyReleasedProducts.getDate() - recentReleasedDuration
  );

  const recentProducts = await Product.find({
    createdAt: { $gte: recentlyReleasedProducts },
  }).sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    productNum: recentProducts.length,
    data: {
      recentProducts,
    },
  });
});

export const getAllProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeature(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const product = await features.query;

  res.status(200).json({
    status: "success",
    productNum: product.length,
    data: {
      product,
    },
  });
});

export const createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

export const getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new AppError(`No Product Found with this id : ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(
      new AppError(`No Product Found with this id : ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(
      new AppError(`No Product Found with this id : ${req.params.id}`, 404)
    );
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
