import express from "express";
import passport from "passport";
const router = express.Router();

const oauthRouter = () => {
  router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );
  return router;
};

export default oauthRouter();
