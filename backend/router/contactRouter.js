import express from 'express';
import { isAuthenticated, isAuthorized } from '../utils/auth.js';
import { Create_Contact, Delete_Contact, Get_Contacts, Update_Contact } from '../controller/contactController.js';


const ContactRouter = express.Router();

ContactRouter.route("/create").post(Create_Contact)
ContactRouter.route("/contacts").get(isAuthenticated,isAuthorized("admin"),Get_Contacts)
ContactRouter.route("/update/:id").put(isAuthenticated,isAuthorized("admin"),Update_Contact)
ContactRouter.route("/delete/:id").delete(isAuthenticated,isAuthorized("admin"),Delete_Contact)

export default ContactRouter;