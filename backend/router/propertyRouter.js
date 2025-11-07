import express from 'express';
import { isAuthenticated, isAuthorized } from '../utils/auth.js';
import { Admin_Fetch_All_Properties, Create_rating, Delete_Property, Featured_Property_Toggle, FeaturedCCity_Property_Toggle, Fetch_Properties, Fetch_Property_Details, Property_create, sendEmailToUser, Update_Property } from '../controller/properrtyController.js';
import { upload } from '../utils/uploads.js';


const PropertyRouter = express.Router();

PropertyRouter.post(
  "/create",
  upload.array("images", 6),
  isAuthenticated,
  isAuthorized("agent", "admin"),
  Property_create
);
PropertyRouter.route("/properties").get(Fetch_Properties)
PropertyRouter.route("/admin-properties").get(isAuthenticated,isAuthorized("admin"), Admin_Fetch_All_Properties)
PropertyRouter.route("/property/:id").get(Fetch_Property_Details)
PropertyRouter.route("/rating/:id").put(isAuthenticated, Create_rating)
PropertyRouter.route("/update_property/:id").put(isAuthenticated,isAuthorized("admin"), Update_Property)
PropertyRouter.route("/delete/:id").delete(isAuthenticated,isAuthorized("admin"), Delete_Property)
PropertyRouter.route("/featuedcity/:id").get(isAuthenticated, isAuthorized("admin"),FeaturedCCity_Property_Toggle)
PropertyRouter.route("/featured/:id").get(isAuthenticated, isAuthorized("admin"),Featured_Property_Toggle)
PropertyRouter.route("/admin-send-email").post(isAuthenticated, isAuthorized("admin"),sendEmailToUser)

export default PropertyRouter;