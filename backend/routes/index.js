import { Router } from "express";
import UniversityController from "../controllers/UniversityController.js";
import AuthController from "../controllers/AuthController.js";
import UserController from "../controllers/UserController.js";

class Routers {
  constructor() {
    this.UniversityController = new UniversityController();
    this.AuthController = new AuthController();
    this.UserController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      `/university/getAll/:page/:limit/:filter?`,
      this.UniversityController.getAllUniversities
    );
    this.router.get(`/university/getById/:id`, this.UniversityController.getUniversityById);
    this.router.post(`/auth/login`, this.AuthController.authLogin);
    this.router.post(`/auth/refresh`, this.AuthController.getRefreshToken);
    this.router.post(`/user/create`, this.UserController.createUser);
  }
}

export default Routers;
