import { Op } from "sequelize";
import { MOCK_DATA } from "../MOCK_DATA.js";

import DB from "../repository/db.js";
const { Universities } = DB;
class UniversityController {
  constructor() {}

  getAllUniversities = async (req, res) => {
    try {
      const page = parseInt(req.params.page) || 1;
      const limit = parseInt(req.params.limit) || 10;
      const filter = req.params.filter || "";
      console.log(page * limit);
      const universities = await Universities.findAll({
        where: {
          name: {
            [Op.like]: "%" + filter + "%",
          },
        },
        limit: limit,
      });
      console.log(universities);
      const data = {
        message: "Success",
        status: true,
        data: universities,
        pagination: {
          totalRecords: universities.length,
          page: page,
          limit: limit,
        },
      };

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Veritabanı hatası",
        status: false,
      });
    }
  };

  getUniversityById = async (req, res) => {
    try {
      const id = req.params.id;
      const university = await Universities.findOne({
        where: {
          university_id: id,
        },
      });
      res.status(200).json({ data: university || {} });
    } catch (err) {
      console.log(err);
    }
  };

  getUniversitiesForComparison = async (req, res) => {
    try {
      const ids = req.params.ids;
      const data = await Universities.findAll({
        where: {
          university_id: {
            [Op.in]: ids.split(","),
          },
        },
      });
      res.status(200).json({ data: data });
    } catch (err) {
      console.log(err);
    }
  };
}

export default UniversityController;
