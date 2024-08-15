import { Router } from "express";
import indexController from "../controllers/indexControllers";

class IndexRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.post('/registro', indexController.register);
    this.router.post('/login', indexController.login);
  }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
