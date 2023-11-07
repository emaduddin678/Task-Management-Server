import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {

  const token = req.cookies.access_token;
  // console.log(token) 
  if (!token) {
    return next(createError(403, "You are not auhtenticated Emad!"));
  }

  // invalid token - synchronous
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) { 
    return next(createError(402, "Token is not valid!"));
  }
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.userId) {
      next();
    } else {
      next(createError(403, "You are not authorized!"));
    }
  });
};
