import crypto from "crypto";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must add your name!"],
  },
  email: {
    type: String,
    required: [true, "Please Prodive your email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please Provide a valid email"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please Confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not the same!!!",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  userPayments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "UserPayment",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre("find", function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.isPasswordMatched = async function (
  candidatePasswrod,
  userPassword
) {
  return await bcrypt.compare(candidatePasswrod, userPassword);
};

userSchema.methods.changedPasswordAfterTokenReleased = function (JWTTImeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTImeStamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  // create reset Token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // hashed it to save it in db
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
