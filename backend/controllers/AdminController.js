import "dotenv/config";
import DB from "../repository/db.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyToken } from "../helpers/verifyToken.js";
const { Users, Universities } = DB;

class AdminController {
  constructor() {}

  getUsers = async (req, res) => {
    try {
      verifyToken(req, res, async () => {
        const { page, limit } = req.params;

        if (typeof page !== "undefined" && typeof limit !== "undefined") {
          const parsedPage = parseInt(page);
          const parsedLimit = parseInt(limit);

          if (isNaN(parsedPage) || isNaN(parsedLimit)) {
            return res
              .status(400)
              .json({ message: "Invalid page or limit value" });
          } else {
            const offset = (parsedPage - 1) * parsedLimit;

            try {
              const users = await Users.findAll({
                offset: offset,
                limit: parsedLimit,
              });

              const totalRecords = await Users.count();
              return res.status(200).json({
                data: users,
                pagination: {
                  totalRecords: totalRecords,
                  page: parsedPage,
                  limit: parsedLimit,
                },
                message: "Success",
                status: true,
              });
            } catch (error) {
              console.error("Veri alınırken bir hata oluştu:", error);
              return res.status(500).json({ message: "Internal server error" });
            }
          }
        } else {
          return res.status(400).json({ message: "Missing fields" });
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  createUser = async (req, res) => {
    try {
      verifyToken(req, res, async () => {
        const { email, password, first_name, last_name, university_id } =
          req.body;
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
            return res
              .status(200)
              .json({ message: "User created successfully" });
          } else {
            return res
              .status(400)
              .json({ message: "User could not be created" });
          }
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
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

  createUniversity = async (req, res) => {
    try {
      verifyToken(req, res, async () => {
        const data = req.body;
        const university_id = uuidv4();
        data.university_id = university_id;
        const response = await Universities.create(data);
        if (response) {
          return res.status(200).json({ message: "success" });
        }
        return res.status(400).json({ message: "error" });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default AdminController;
