import express from "express";
import {
  getAllProfiles,
  getUserProfile,
  login,
  register,
  signOut,
  updateProfileVisibility,
  updateUserDetails,
} from "../controllers/user.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

const userRouter = () => {
  // POST signup
  router.post("/register", register);

  // POST LOGIN
  router.post("/login", login);

  //   PATCH update user
  router.patch("/update", authenticateToken, updateUserDetails);

  //   PATCH update profile visibility

  router.patch("/visibility", authenticateToken, updateProfileVisibility);

  // GET user profile
  router.get("/profile", authenticateToken, getUserProfile);

  // GET all profiles (only accessible to admin users)
  router.get("/profiles", authenticateToken, getAllProfiles);

  // POST sign out
  router.post("/signout", authenticateToken, signOut);

  return router;
};

export default userRouter();
