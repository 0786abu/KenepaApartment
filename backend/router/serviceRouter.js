import express from 'express';
import { isAuthenticated, isAuthorized } from '../utils/auth.js';
import { Create_Service, Delete_Service, Get_Services, Update_Service } from '../controller/serviceController.js';


const ServiceRouter = express.Router();

ServiceRouter.route("/create").post(isAuthenticated,isAuthorized("admin"),Create_Service)
ServiceRouter.route("/services").get(Get_Services)
ServiceRouter.route("/update/:id").put(isAuthenticated,isAuthorized("admin"),Update_Service)
ServiceRouter.route("/delete/:id").delete(isAuthenticated,isAuthorized("admin"),Delete_Service)

export default ServiceRouter;