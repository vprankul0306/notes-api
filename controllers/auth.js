const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const handleSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if (req.headers.cookie) {
      const token = req.headers.cookie.split("=")[1];
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ message: "You already logged in" });
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          console.log("Token is expired");
          // Token is expired, continue with the login process
        } else {
          // Handle other errors
          throw err;
        }
      }
    }

    const existedUser = await User.findOne({ username });

    if (existedUser) {
      const passwordMatched = bcryptjs.compareSync(
        password,
        existedUser.password
      );
      if (passwordMatched) {
        const token = jwt.sign(
          { id: existedUser._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.cookie("token", token, { httpOnly: true });
        return res.status(200).json({ message: "Login successfully", token });
      } else {
        return res.status(400).json({ message: "Password is incorrect" });
      }
    } else {
      return res.status(400).json({ message: "User does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const handleLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleSignup, handleLogin, handleLogout };
