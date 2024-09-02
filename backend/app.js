import express from "express";
import AppError from "./utils/appError.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import globalErrorhandler from "./controllers/errorController.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";

const app = express();

// Body parser
app.use(express.json({ limitL: "10kb" }));

app.use(ExpressMongoSanitize());

app.use(xss());

app.use(helmet());

// prevent parametar Pollution
// app.use(
//   hpp({
//     whitelist: ["sort"],
//   })
// );

// handle to many requests
const limiter = rateLimit({
  max: 50,
  windowMs: 60 * 60 * 1000,
  message: "to many requests from this ip, Please Try again in an houre",
});
app.use("/api", limiter);

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`con't find ${req.originalUrl}`, 404));
});

app.use(globalErrorhandler);

export default app;
