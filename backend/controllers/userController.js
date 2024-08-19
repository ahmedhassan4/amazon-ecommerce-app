import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const filterRequestBody = (bodyRequest, ...allowedFields) => {
  const filteredBodyRequest = {};
  Object.keys(bodyRequest).forEach((ele) => {
    if (allowedFields.includes(ele))
      filteredBodyRequest[ele] = bodyRequest[ele];
  });
  return filteredBodyRequest;
};

export const getAllusers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "this route is not for Password update, please use /updateMyPassword instead !",
        400
      )
    );
  }

  console.log(req.body);
  const filterdUpdatedData = filterRequestBody(req.body, "name", "email");
  const updaatedUser = await User.findByIdAndUpdate(
    req.user.id,
    filterdUpdatedData,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updaatedUser,
    },
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const createUser = (req, res) => {
  res.status(200).json({
    data: "heloooooooo;o;",
  });
};
export const getUser = (req, res) => {
  res.status(200).json({
    data: "heloooooooo;o;",
  });
};
export const updateUser = (req, res) => {
  res.status(200).json({
    data: "heloooooooo;o;",
  });
};
export const deleteUser = (req, res) => {
  res.status(200).json({
    data: "heloooooooo;o;",
  });
};
