import jwt from "jsonwebtoken";
import DB from "../repository/db.js";
const { Users } = DB;
export const adminValidation = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid" });
      }
      console.log("next", user);
      const userDB = await Users.findOne({ where: { email: user.email } });
      if (userDB || userDB.isAdmin || user?.isAdmin) {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
