import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      throw new Error("User have already registered");
    }

    user = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Email not found");
    }

    const comparedPassword = password === user.password;
    if (comparedPassword) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/getUser/:id", async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      return res.status(404).json({
        error: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.put("/updateUser/:id", async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);

    if (user) {
      user.name = req.body.name;
      const updatedUser = await user.save();
      return res.status(201).json(updatedUser);
    } else {
      return res.status(404).json({
        error: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.delete("/deletedUser/:id", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ slug: req.params.slug });

    if (!user) {
      throw new Error("user was not found");
    }

    return res.json({
      message: "user is successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

export const userRoutes = router;
