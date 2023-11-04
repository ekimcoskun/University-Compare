import { Router } from "express";
import UniversityController from "../controllers/UniversityController.js";
import AuthController from "../controllers/AuthController.js";
import AdminController from "../controllers/AdminController.js";
import UniversityRouter from "./universityRouter.js";
import AdminRouter from "./adminRouter.js";
import AuthRouter from "./authRouter.js";

class Routers {
  constructor() {
    this.universityRouter = new UniversityRouter();
    this.adminRouter = new AdminRouter();
    this.authRouter = new AuthRouter();
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.use("/university", this.universityRouter.router);
    this.router.use("/admin", this.adminRouter.router);
    this.router.use("/auth", this.authRouter.router);
  }
}

export default Routers;
