import jwt from "jsonwebtoken";

export const verfiyToken = (req, res, next) => {
  let { token } = req.headers;
  jwt.verify(token, "tokenkey", (err, decoded) => {
    if (err) return res.json({ message: "invalid token" });
    req.user = decoded;
    next();
  });
};
  