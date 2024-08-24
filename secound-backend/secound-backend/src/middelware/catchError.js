import AppError from "../utili/appError.js";

export default function catchError(fun) {
  return (req, res, next) => {
    fun(req, res, next).catch((err) => {
      next(new AppError(err, 400));
      //   res.status(400).json({ message: err });
    });
  };
}
