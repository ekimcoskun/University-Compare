import { Router } from "express";
import AdminController from "../controllers/AdminController.js";

class AdminRouter {
  constructor() {
    this.router = Router();
    this.AdminController = new AdminController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `/university/create`,
      this.AdminController.createUniversity
    );
    this.router.post(`/user/create`, this.AdminController.createUser);
    this.router.get(
      `/user/getAll/:page/:limit/:filter?`,
      this.AdminController.getUsers
    );
  }
}

export default AdminRouter;
