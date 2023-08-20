import { MOCK_DATA } from "../MOCK_DATA.js";
class UniversityController {
  constructor() {}

  getAllUniversities = async (req, res) => {
    try {
      const page = req.params.page;
      const limit = req.params.limit;
      const filter = req.params.filter;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedData = MOCK_DATA.slice(startIndex, endIndex);
      const data = {
        message: "Success",
        status: true,
        data: paginatedData,
        pagination: {
          totalRecords: MOCK_DATA.length,
          page: page,
          limit: limit,
        },
      };
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  };

  getUniversityById = async (req, res) => {
    try {
      console.log(MOCK_DATA[0]);
      res.status(200).json({ data: MOCK_DATA[0] });
    } catch (err) {
      console.log(err);
    }
  };

  getUniversitiesForComparison = async (req, res) => {
    try {
      const ids = req.params.ids;
      const data = [MOCK_DATA[0], MOCK_DATA[1]];
      res.status(200).json({ data: data });
    } catch (err) {
      console.log(err);
    }
  };
}

export default UniversityController;
