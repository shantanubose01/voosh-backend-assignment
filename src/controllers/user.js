import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config();

// Register a new user

export const register = async (req, res) => {
  // Check for id_token or email/password
  if (req.body.id_token) {
    await registerWithGoogle(req, res);
  } else {
    await registerWithEmailAndPassword(req, res);
  }
};
export const registerWithEmailAndPassword = async (req, res) => {
  console.log("hit register happend");
  try {
    const { name, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({
          message: "Invalid email format. Please enter a valid email address.",
        });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create new user
    const newUser = new UserModel({
      name,
      email,
      password,
    });

    console.log({ newUser });

    // Save user to database
    await newUser.save();

    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

async function registerWithGoogle(req, res) {
  const idToken = req.body.id_token;

  const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    // Check if user already exists using email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

     // Create new user
     const newUser = new UserModel({
      name,
      email
    });

    console.log({ newUser });

    // Save user to database
    await newUser.save();

    return res.status(200).json({ message: 'User registered successfully', userData });
  } catch (error){
    return res.status(500).json({ message: 'server error' });
  }
}

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email }, "+password").lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile (public or private)
export const updateProfileVisibility = async (req, res) => {
  try {
    const { isPublic } = req.body;
    const userId = req.user;

    await UserModel.findByIdAndUpdate(userId, { isPublic });

    res
      .status(200)
      .json({ message: "Profile visibility updated successfully" });
  } catch (error) {
    console.error("Error updating profile visibility:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user details (photo, name, email, bio, password)
export const updateUserDetails = async (req, res) => {
  try {
    const userId = req.user;
    const { name, email, bio, password, photo } = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (bio) updates.bio = bio;
    if (photo) updates.photo = photo;
    if (password) {
      updates.password = password;
    }

    await UserModel.findByIdAndUpdate(userId, updates);

    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// fetch user profiles

export const getAllProfiles = async (req, res) => {
  try {
    const userId = req.user;
    const userDetails = await UserModel.findById(userId);

    //better way is to do with limit and sort and implement infinite scroll in frontend

    let profiles;

    // If the user is an admin, fetch all profiles
    if (userDetails.userType === "ADMIN") {
      profiles = await UserModel.find();
    } else {
      // If the user is not an admin, fetch only public profiles
      profiles = await UserModel.find({ isPublic: true });
    }

    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch user's own profile data
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const signOut = async (req, res) => {
  try {
    // If server side cookie is implemented then we can clear that from here.
    // in my implementation it is not there. so from frontend , cookie needs to be cleared
    // which will store the access token

    res.status(200).json({ message: "Sign out successful" });
  } catch (error) {
    console.error("Error signing out user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
