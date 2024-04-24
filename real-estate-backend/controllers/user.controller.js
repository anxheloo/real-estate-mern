import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({
    message: "User api works",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...others } = updatedUser._doc;

    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));

  try {
    await User.findByIdAndDelete(req.params.id);

    res.clearCookie("access_token");

    res.status(200).json("User Successfully deleted!");
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;

  console.log("Inside getUser backend: printing id from params:", id);

  try {
    const existingUser = await User.findById(id);
    console.log("This is existing user:", existingUser);

    if (!existingUser) {
      return next(errorHandler(404, "User not found!"));
    }

    console.log("After !existing user:");

    const { password: pass, ...rest } = existingUser._doc;

    console.log("This is rest:", rest);
    res.status(200).json(rest);
  } catch (error) {
    console.log("This is error:", error);
    console.log("This is error.message:", error.message);
    next(error);
  }
};
