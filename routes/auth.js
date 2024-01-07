const authRouter = require("express").Router();
const {
  handleLogin,
  handleSignup,
  handleLogout,
} = require("../controllers/auth");

authRouter.post("/api/auth/login", handleLogin);
authRouter.post("/api/auth/signup", handleSignup);
authRouter.post("/api/auth/logout", handleLogout);

module.exports = authRouter;
