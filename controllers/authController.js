import User from "../models/UserModel.js";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
// import bcrypt from
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();

    const token = jwt.sign(
      { username: newUser.username, id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .send({
        user: newUser,
        message: "User has been created.",
        token: token,
        success: true,
      });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password for username"));

    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const { password, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ details: { ...otherDetails }, token: token, success: true });
  } catch (error) {
    next(error);
  }
};
