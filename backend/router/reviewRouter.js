import express from 'express';
import { isAuthenticated, isAuthorized } from '../utils/auth.js';
import { Create_Customer_Review, Delete_Customer_Review, Get_Customer_Reviews, Update_Customer_Review } from '../controller/reviewController.js';
import { upload } from '../utils/uploads.js';


const ReviewRouter = express.Router();

ReviewRouter.post("/create", upload.single("profile"),Create_Customer_Review)
ReviewRouter.route("/reviews").get(Get_Customer_Reviews)
ReviewRouter.route("/update/:id").put(isAuthenticated,isAuthorized("admin"),Update_Customer_Review)
ReviewRouter.route("/delete/:id").delete(isAuthenticated,isAuthorized("admin"),Delete_Customer_Review)



export default ReviewRouter;