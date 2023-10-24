import jwt from "jsonwebtoken";
import "dotenv/config";
import {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/verifyToken.js";
import bcrypt from "bcrypt";
import DB from "../repository/db.js";
const { Users } = DB;
class AuthController {
  constructor() {}

  authLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      if (!(email && password)) {
        return res.status(400).json({ message: "Missing fields" });
      }
      const user = await Users.findOne({ where: { email } });
      if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // BURADA REFRESH TOKEN DBYE KAYDEDİLECEK
        res.json({
          email: user.email,
          password: user.password,
          token: accessToken,
          refreshToken,
        });
      } else {
        res.status(400).json({ message: "Email or password is incorrect" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  getRefreshToken = async (req, res) => {
    try {
      const refreshToken = req.body.token;
      if (!refreshToken)
        return res.status(401).json({ message: "User not authenticated" });
      // BURADA DB'DEN REFRESH TOKEN KONTROL EDİLECEK YOKSA 403 DÖNECEK
      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        err && console.log(err);

        // BURADA REFRESH TOKEN DBDEN SİLİNECEK

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        // BURADA YENİ REFRESH TOKEN DBYE KAYDEDİLECEK
        res
          .status(200)
          .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export default AuthController;
