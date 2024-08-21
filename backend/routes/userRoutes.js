import express from "express";
import {
  getAllusers,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
} from "../controllers/userController.js";

import {
  forgetPassword,
  login,
  protect,
  resetPassword,
  signup,
  updatePassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/forgotPassword", forgetPassword);
router.patch("/resetPassword/:token", resetPassword);

router.patch("/updateMyPassword", protect, updatePassword);
router.patch("/updateMe", protect, updateMe);
router.delete("/deleteMe", protect, deleteMe);

router.route("/").get(getAllusers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
