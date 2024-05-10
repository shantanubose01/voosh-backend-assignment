import express from "express";
import userRoutes from "./user.js";
import oauthRoutes from "./oauth.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/oauth", oauthRoutes);

export default router;
