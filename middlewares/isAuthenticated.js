const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    if (req.headers.cookie) {
      const token = req.headers.cookie.split("=")[1];
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const id = decodedToken.id;
        req.id = id;
        next();
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          // Token is expired, handle it accordingly
          return res.status(401).json({ message: "Token has expired" });
        } else {
          // Other verification issues, handle them accordingly
          return res.status(401).json({ message: "Token verification failed" });
        }
      }
    } else {
      return res.status(400).json({ message: "You are not logged in" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = isAuthenticated;
