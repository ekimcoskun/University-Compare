import { Router } from "express";
import UniversityController from "../controllers/UniversityController.js";

class Routers {
  constructor() {
    this.UniversityController = new UniversityController();
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`/getAll`, this.UniversityController.getAllUniversity);
    this.router.get(`/getById`, this.UniversityController.getUniversityById);
  }
}

export default Routers;
