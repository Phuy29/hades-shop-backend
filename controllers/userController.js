const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const allUser = await User.find();
      res.status(200).json(allUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getOneUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        isAdmin: req.body.isAdmin,
      };

      const user = await User.findById(req.params.id);
      await user.updateOne({ $set: newUser });
      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
