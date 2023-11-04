import { Router } from "express";
import UniversityController from "../controllers/UniversityController.js";

class UniversityRouter {
  constructor() {
    this.router = Router();
    this.UniversityController = new UniversityController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      `/getAll/:page/:limit/:filter?`,
      this.UniversityController.getAllUniversities
    );
    this.router.get(
      `/getById/:id`,
      this.UniversityController.getUniversityById
    );
    this.router.get(
      `/getByIds/:ids`,
      this.UniversityController.getUniversitiesForComparison
    );
  }
}

export default UniversityRouter;
