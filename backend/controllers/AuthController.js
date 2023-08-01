import { MOCK_DATA } from "../MOCK_DATA.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { verifyToken, generateAccessToken, generateRefreshToken } from "../helpers/verifyToken.js";

class AuthController {
  constructor() {
    this.users = [
      {
        id: 1,
        email: "admin@admin.com",
        password: "password",
        firstName: "Admin",
        lastName: "User",
        isAdmin: true,
        token: "",
      },
      {
        id: 2,
        email: "member@admin.com",
        password: "password",
        firstName: "Member",
        lastName: "User",
        isAdmin: false,
        token: "",
      },
    ];
  }

  authLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = this.users.find((x) => x.email === email && x.password === password);
      if (user) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // BURADA REFRESH TOKEN DBYE KAYDEDİLECEK
        res.json({ email: user.email, password: user.password, accessToken, refreshToken });
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
      if (!refreshToken) return res.status(401).json({ message: "User not authenticated" });
      // BURADA DB'DEN REFRESH TOKEN KONTROL EDİLECEK YOKSA 403 DÖNECEK
      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        err && console.log(err);

        // BURADA REFRESH TOKEN DBDEN SİLİNECEK

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        // BURADA YENİ REFRESH TOKEN DBYE KAYDEDİLECEK
        res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export default AuthController;
