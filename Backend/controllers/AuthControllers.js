import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compare } from "bcrypt";
import { renameSync, unlinkSync } from "fs";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res) => {
  try {
    // console.log(req.body);
    const { userName, email, password } = req.body;
    if (!email || !password || !userName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const uniqueNameRequired = await User.findOne({ userName });
    if (uniqueNameRequired) {
      return res.status(403).json({
        success: false,
        message: "Unique userName required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({
        success: false,
        message: "User Already Exist",
      });
    }

    const newUser = await User.create({
      email,
      password,
      userName,
    });

    return res
      .status(201)
      .cookie("jwt", createToken(newUser.email, newUser._id), {
        maxAge,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Signup Successfull",
        user: {
          id: newUser._id,
          userName: newUser.userName,
          email: newUser.email,
          profileSetup: newUser.profileSetup,
        },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordMatched = await compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "password incorrect",
      });
    }
    const { password: _, ...userWithoutPassword } = user.toObject();

    return res
      .status(200)
      .cookie("jwt", createToken(user.email, user._id), {
        maxAge,
        secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Login Successfull",
        user: userWithoutPassword,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    // console.log(req.userId);
    const user = await User.findOne({ _id: req.userId });
    // console.log(user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    } 
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({
      success: true,
      message: "User found",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req;
    const { firstName, lastName, color } = req.body;

    if (!firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, color, profileSetup: true },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "User profile updated",
      userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const addProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const date = Date.now();
    let fileName = "uploads/profiles/" + date + req.file.originalname;
    renameSync(req.file.path, fileName);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { profImage: fileName },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      message: "User profile photo updated",
      profImage: updatedUser.profImage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const removeProfileImage = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not exist",
      });
    }

    if (user.profImage) {
      unlinkSync(user.profImage);
    }

    user.profImage = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile image deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    return res
      .status(200)
      .cookie("jwt", "", {
        maxAge: 0,
        secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Logout Successfull",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
