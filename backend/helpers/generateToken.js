import jwt from "jsonwebtoken";
import "dotenv/config";

const generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, isAdmin: user.isAdmin, email: user.email },
    process.env.JWT_SECRET
  );
  return accessToken;
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.JWT_REFRESH_SECRET
  );
  return refreshToken;
};

export { generateAccessToken, generateRefreshToken };
