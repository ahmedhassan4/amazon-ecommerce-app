import crypto from "crypto";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import { promisify } from "util";
import sendEmail from "../utils/email.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  });

  createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.isPasswordMatched(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, res);
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("you are not logged in, Please Login in to get access.", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if the user still exist (not deleted after sign in)
  const activeUser = await User.findById(decoded.id);
  if (!activeUser) {
    return next(
      new AppError(
        "The token belonging to this user does no longer exist!",
        401
      )
    );
  }

  // check if the user update his password after the token was issued
  if (activeUser.changedPasswordAfterTokenReleased(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please login again.", 401)
    );
  }

  // add recetly login user to the request obj
  req.user = activeUser;
  next();
});

export const restrictTo = (role) => {
  return (req, res, next) => {
    if (role !== req.user.role) {
      return next(
        new AppError("You do not have Premission to perform this action", 403)
      );
    }
    next();
  };
};

export const forgetPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("there is no user with this email address", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // send token to user Email
  const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? submit a patch request with new password and passwordConfirm to ${resetURL}.\n if you did not forgot your password forgot this email`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for only 10 minutes)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "token sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. try again later", 500)
    );
  }
};

export const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // if there is a user and token not expired ,set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // change changedPasswordAt property for the user

  //log the user in and sen JWT
  createSendToken(user, 200, res);
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (
    !(await user.isPasswordMatched(req.body.currentPassword, user.password))
  ) {
    return next(
      new AppError("invalid password. Please write valid current password", 401)
    );
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
});
