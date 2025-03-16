import { UserModel } from "../models/binge.js";
import { registerValidation, loginValidation } from "../validators/binge.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerCast = async (req, res) => {
  // Validate request
  const { error } = registerValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Check if user already exists
  const emailExists = await UserModel.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).json({ message: "Email already exists" });

  const usernameExists = await UserModel.findOne({
    username: req.body.username,
  });
  if (usernameExists)
    return res.status(400).json({ message: "Username already exists" });

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // // Create new user
  // const user = new UserModel({
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: hashedPassword,
  //   dateOfBirth: req.body.dateOfBirth,
  // });

  try {
    const savedUser = await UserModel.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      dateOfBirth: req.body.dateOfBirth,
    });
    res.status(201).json({
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginCast = async (req, res) => {
  // Validate request
  const { error } = loginValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Check if user exists
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });

  // Check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Invalid email or password" });

  // Create and assign token
  const token = jwt.sign(
    { id: user.id },
    process.env.TOKEN_SECRET || "your_jwt_secret",
    { expiresIn: "1h" }
  );

  res.header("auth-token", token).json({
    message: "Logged in successfully",
    token: token,
  });
};
