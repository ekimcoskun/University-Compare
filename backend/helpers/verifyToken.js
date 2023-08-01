import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const generateAccessToken = (user) => {
  const accessToken = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return accessToken;
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.JWT_REFRESH_SECRET
  );
  return refreshToken;
};

export { verifyToken, generateAccessToken, generateRefreshToken };
