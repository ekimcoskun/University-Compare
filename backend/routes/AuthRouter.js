import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

class AuthRouter {
  constructor() {
    this.router = Router();
    this.AuthController = new AuthController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(`/login`, this.AuthController.authLogin);
    this.router.post(`/refresh`, this.AuthController.getRefreshToken);
  }
}

export default AuthRouter;
