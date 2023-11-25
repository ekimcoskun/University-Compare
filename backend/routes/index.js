import { Router } from "express";
import UniversityRouter from "./universityRouter.js";
import AdminRouter from "./adminRouter.js";
import AuthRouter from "./authRouter.js";
import DashboardRouter from "./DashboardRouter.js";
import { adminValidation } from "../middlewares/adminValidation.js";

class Routers {
  constructor() {
    this.universityRouter = new UniversityRouter();
    this.adminRouter = new AdminRouter();
    this.authRouter = new AuthRouter();
    this.dashboardRouter = new DashboardRouter();
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.use("/university", this.universityRouter.router);
    this.router.use("/admin", adminValidation, this.adminRouter.router);
    this.router.use("/auth", this.authRouter.router);
    this.router.use("/dashboard", this.dashboardRouter.router);
  }
}

export default Routers;
