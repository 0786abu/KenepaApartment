import express from 'express';
import { Admin_Update_User, Admin_Update_Your_Profile, ChangePassword, Login, Logout } from '../controller/userController.js';
import { isAuthenticated, isAuthorized } from '../utils/auth.js';
import { upload } from '../utils/uploads.js';


const UserRouter = express.Router();

UserRouter.route("/login").post(Login)
UserRouter.route("/logout").get(Logout)
UserRouter.route("/changepassword").put(isAuthenticated, ChangePassword)
UserRouter.route("/updateuser/:id").put(isAuthenticated,isAuthorized("admin"),Admin_Update_User);
UserRouter.put("/admin-update-profile", upload.single("profile"),isAuthenticated,isAuthorized("admin"),Admin_Update_Your_Profile)




export default UserRouter;