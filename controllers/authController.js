const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../schemas/user");

let refreshTokens = [];

const authController = {
  register: async (req, res) => {
    try {
      const body = registerSchema.parse(req.body);

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(body.password, salt);

      const newUser = await new User({
        username: body.username,
        email: body.email,
        password: hashPassword,
      });

      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "20s" }
    );
  },

  createRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "365d" }
    );
  },

  login: async (req, res) => {
    try {
      const body = loginSchema.parse(req.body);

      const user = await User.findOne({ username: body.username });

      if (!user) return res.status(404).json("Wrong username!");

      const validPassword = await bcrypt.compare(body.password, user.password);

      if (!validPassword) return res.status(404).json("Wrong password!");

      const accessToken = await authController.createAccessToken(user);

      const refreshToken = await authController.createRefreshToken(user);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        patch: "/",
        sameSite: "strict",
      });

      res.status(200).json({ user, accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You ar not authenticated!");

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (error, user) => {
      if (error) return res.status(403).json(error);

      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      const newAccessToken = authController.createAccessToken(user);
      const newRefreshToken = authController.createRefreshToken(user);

      refreshTokens.push(newRefreshToken);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        patch: "/",
        sameSite: "strict",
      });

      res.status(200).json({
        newAccessToken,
        newRefreshToken,
      });
    });
  },

  logout: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json("Logout successfully!");
  },
};

module.exports = authController;
