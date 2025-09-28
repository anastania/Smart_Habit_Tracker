import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Let the User model's pre('save') middleware handle password hashing
  const user = await User.create({
    name,
    email,
    password, // Pass plain password, let the model hash it
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt for email:", email);
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("User found:", user.email);
    console.log("Stored password hash length:", user.password.length);
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", isPasswordValid);
    
    if (isPasswordValid) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      console.log("Password comparison failed");
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
