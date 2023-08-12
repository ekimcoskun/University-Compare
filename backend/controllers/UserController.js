import "dotenv/config";
import DB from "../repository/db.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { Users } = DB;

class AuthController {
  constructor() {}

  createUser = async (req, res) => {
    try {
      const { email, password, first_name, last_name, university_id } = req.body;
      console.log(req.body);
      if (!(email && password && first_name && last_name)) {
        return res.status(400).json({ message: "Missing fields" });
      }
      const user = await Users.findOne({ where: { email } });
      if (user) {
        res.status(400).json({ message: "User already exists" });
      } else {
        const bcryptPassword = await bcrypt.hash(password, 10);
        const userID = uuidv4();
        const token = jwt.sign(
          {
            user_id: userID,
            email: email,
          },
          process.env.JWT_SECRET
        );

        const new_user = await Users.create({
          user_id: userID,
          email,
          password: bcryptPassword,
          first_name,
          last_name,
          university_id,
          isAdmin: false,
          token,
          role: "Member",
        });

        if (new_user) {
          return res.status(200).json({ message: "User created successfully" });
        } else {
          return res.status(400).json({ message: "User could not be created" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  deleteUser = async (req, res) => {
    try {
      // EKLENECEK
    } catch (err) {
      console.log(err);
    }
  };

  updateUser = async (req, res) => {
    try {
      // EKLENECEK
    } catch (err) {
      console.log(err);
    }
  };
}

export default AuthController;
