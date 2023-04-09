const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (!token) return res.status(401).json("You are not authenticated!");

  const accessToken = token.split(" ")[1];

  jwt.verify(accessToken, process.env.ACCESS_TOKEN, (error, user) => {
    if (error) return res.status(403).json("Token is not valid!");

    req.user = user;

    next();
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).json("You are not admin!");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAdmin };
