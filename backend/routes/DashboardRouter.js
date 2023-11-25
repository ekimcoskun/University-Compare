import { Router } from "express";
import DashboardController from "../controllers/DashboardController.js";

class DashboardRouter {
  constructor() {
    this.router = Router();
    this.DashboardController = new DashboardController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`/userCount`, this.DashboardController.countUsers);
  }
}

export default DashboardRouter;
