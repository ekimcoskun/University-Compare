import DB from "../repository/db.js";
const { Users } = DB;

class DashboardController {
  countUsers = async (req, res) => {
    try {
      const count = await Users.count();
      res.status(200).json({ data: count });
    } catch (err) {
      console.log(err);
    }
  };
}

export default DashboardController;
