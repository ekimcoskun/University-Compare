import { Router } from "express";
import UniversityController from "../controllers/UniversityController.js";
import AuthController from "../controllers/AuthController.js";
import AdminController from "../controllers/AdminController.js";

class Routers {
  constructor() {
    this.UniversityController = new UniversityController();
    this.AuthController = new AuthController();
    this.AdminController = new AdminController();
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      `/university/getAll/:page/:limit/:filter?`,
      this.UniversityController.getAllUniversities
    );
    this.router.get(
      `/university/getById/:id`,
      this.UniversityController.getUniversityById
    );
    this.router.get(
      `/university/getByIds/:ids`,
      this.UniversityController.getUniversitiesForComparison
    );
    this.router.post(
      `/admin/university/create`,
      this.AdminController.createUniversity
    );
    this.router.post(`/auth/login`, this.AuthController.authLogin);
    this.router.post(`/auth/refresh`, this.AuthController.getRefreshToken);
    this.router.post(`/admin/user/create`, this.AdminController.createUser);
    this.router.get(
      `/admin/user/getAll/:page/:limit/:filter?`,
      this.AdminController.getUsers
    );
  }
}

export default Routers;
