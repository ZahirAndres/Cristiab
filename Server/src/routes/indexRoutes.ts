import { Router } from "express";
import indexController from "../controllers/indexControllers";

class IndexRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.get('/', indexController.index);
    this.router.post('/validate', indexController.validateUser);
    this.router.get('/id/:username', indexController.getIdByUsername);
    this.router.post('/registro', indexController.create);
    this.router.put('/update/:ID', indexController.update);
    this.router.delete('/:ID', indexController.delete);
  }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
