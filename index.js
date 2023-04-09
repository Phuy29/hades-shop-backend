const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

//Config
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(cookieParser());

//Connect DB
mongoose.connect(process.env.MONGODB_URL, (error) => {
  if (error) throw error;
  console.log("Connected to mongodb!");

  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    console.log("Server is running...");
  });
});

//Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/collection", collectionRoutes);
app.use("/product", productRoutes);
