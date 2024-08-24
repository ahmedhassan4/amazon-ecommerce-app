import bcrypt from "bcrypt";
import { userModel } from "../../../db/model/user/user.model.js";
import jwt from "jsonwebtoken";
import { sendMessageEmail } from "../../email/email.js";
import catchError from "../../middelware/catchError.js";
import AppError from "../../utili/appError.js";

// SIGN-UP
let signUp = catchError(async (req, res, next) => {
  let founderUser = await userModel.findOne({ email: req.body.email });
  if (founderUser) {
    // return res.status(401).json({ message: "already token" });
    next(new AppError("already token", 401));
  } else if (!req.body.age < 5 || !founderUser) {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    let newUser = await userModel.insertMany(req.body);
    sendMessageEmail(req.body.email);
    res.status(200).json({ message: "created", newUser });
  }
});

// SIGN-IN
let signIn = catchError(async (req, res, next) => {
  let founderUser = await userModel.findOne({ email: req.body.email });
  if (
    !founderUser ||
    !bcrypt.compareSync(req.body.password, founderUser.password)
  ) {
    return res.status(404).json({ message: "email or password not valid" });
  }
  if (!founderUser.isComfirmed) {
    next(AppError("please verify your account", 422)); //return res.json({ message: "please verify your account" });
  }
  let token = jwt.sign(
    { role: req.body.role, _id: founderUser._id },
    "tokenkey"
  );
  res.status(200).json({ message: "valid signin", token });
});

//VERIFYACCOUNT
let verifyEmail = catchError(async (req, res, next) => {
  let token = req.params.token;
  jwt.verify(token, "secemail", async (err, decoded) => {
    if (err) return res.json({ message: "ivalid email" });
    let founder = await userModel.findOne({ email: decoded.email });
    if (!founder)
      return res.json({ message: "this account already exist try sign up" });
    if (founder) {
      if (founder.isComfirmed) next(new AppError("already Vreified", 200));
      //return res.json({ message: "already Vreified" });
    }
    await userModel.findOneAndUpdate(
      { email: decoded.email },
      {
        isComfirmed: true,
      }
    );
    res.json({ message: "Welcome ya beh :)", decoded });
  });
});

export { signUp, signIn, verifyEmail };
