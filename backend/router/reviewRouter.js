import express from 'express';
import { isAuthenticated, isAuthorized } from '../utils/auth.js';
import { Create_Customer_Review, create_Feature_City, Delete_Customer_Review, delete_Feature_City, Get_Customer_Reviews, get_Featured_Cities, Update_Customer_Review, update_Feature_City } from '../controller/reviewController.js';
import { upload } from '../utils/uploads.js';


const ReviewRouter = express.Router();

ReviewRouter.post("/create", upload.single("profile"),Create_Customer_Review)
ReviewRouter.route("/reviews").get(Get_Customer_Reviews)
ReviewRouter.route("/update/:id").put(isAuthenticated,isAuthorized("admin"),Update_Customer_Review)
ReviewRouter.route("/delete/:id").delete(isAuthenticated,isAuthorized("admin"),Delete_Customer_Review)

// cities
// ReviewRouter.route("/city/create").post(isAuthenticated,isAuthorized("admin"), create_Feature_City)
ReviewRouter.post("/city/create", upload.single("image"),isAuthenticated,isAuthorized("admin"), create_Feature_City)
ReviewRouter.route("/city/cities").get(get_Featured_Cities)
ReviewRouter.route("/city/update/:id").put(update_Feature_City)
ReviewRouter.route("/city/delete/:id").delete(delete_Feature_City)



export default ReviewRouter;