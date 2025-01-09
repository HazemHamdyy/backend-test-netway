import User from "../models/user.model.js";
import AppError from "../utils/app.error.js";
import asyncHandler from "../utils/async-handler.js";
import { signToken } from "../utils/jwt.js";

const signup = asyncHandler(async (req, res, next) => {
  req.body.email = req.body.email.toLowerCase();
  const user = await User.create(req.body);
  const token = signToken(user.id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

const login = asyncHandler(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(new AppError(`Please provide email and password`, 400));
  }
  req.body.email = req.body.email.toLowerCase();
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user) {
    return next(new AppError(`Invalid Credentials`, 401));
  }
  if (!(await user.isCorrectPassword(req.body.password, user.password))) {
    return next(new AppError(`Invalid Credentials`, 401));
  }
  const token = signToken(user.id);
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

export {signup, login}
