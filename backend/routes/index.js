import { Router } from "express";
import UniversityController from "../controllers/UniversityController.js";

class Routers {
  constructor() {
    this.UniversityController = new UniversityController();
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      `/university/getAll/:page/:limit/:filter?`,
      this.UniversityController.getAllUniversities
    );
    this.router.get(`/university/getById/:id`, this.UniversityController.getUniversityById);
  }
}

export default Routers;
