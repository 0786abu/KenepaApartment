import express from 'express';
import { isAuthenticated, isAuthorized } from '../utils/auth.js';
import { upload } from '../utils/uploads.js';
import { createCar, deleteCar, getAllCars, getCarById, updateCar } from '../controller/carController.js';


const carRouter = express.Router();

carRouter.post("/create", upload.array("images",10), isAuthenticated, isAuthorized("admin"), createCar)
carRouter.get("/cars", getAllCars);
carRouter.get("/car/:id", getCarById);
carRouter.put("/update/:id", upload.array("images",10), isAuthenticated, isAuthorized("admin"), updateCar);
carRouter.delete("/delete/:id", isAuthenticated, isAuthorized("admin"), deleteCar);

export default carRouter;