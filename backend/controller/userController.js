import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from '../model/AuthModel.js';


export const Login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        if(!email ||!password){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10d' });
        res.cookie("token",token,{
            expires:  new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 day
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? "none":'lax',
            path:'/'
        })
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })
    }
}

export const Logout = async(req,res)=>{
    try {
        res.cookie("token",null,{
            expires: new Date(Date.now()),
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        });
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })
    }
}

export const ChangePassword = async(req,res)=>{
    try {
        const {oldPassword,newPassword,confirm_Password} = req.body;
        const user = await User.findById(req.user._id).select("+password");
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        if(!oldPassword){
            return res.status(400).json({
                success: false,
                message: 'old password field is required'
            })
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: 'Invalid old password'
            })
        }
        if(!newPassword ||!confirm_Password){
            return res.status(400).json({
                success: false,
                message: 'new password and confirm password fields are required'
            })
        }
        if(newPassword!== confirm_Password){
            return res.status(400).json({
                success: false,
                message: 'New password and confirm password do not match'
            })
        }
        const hashpassword = await bcrypt.hash(newPassword, 10);
        user.password = hashpassword;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })
    }
}

export const Admin_Update_User = async(req,res)=>{
    try {
        const {role} = req.body;
        const {id} = req.params;
        const user = await User.findById(id);
        if(!role){
            return res.status(404).json({
                success: false,
                message: 'Role Needed'
            });
        }
        if(user.role==="agent"){
            return res.status(400).json({
                success: false,
                message: 'You cannot update an agent'
            });
        }
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        user.role = role;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })
    }
}

export const Admin_Update_Your_Profile = async (req,res)=>{
    try {
        const admin = await User.findById(req.user._id);
        const {name,email,phone,address} = req.body;
        if(!admin){
            return res.status(400).json({
                success:false,
                message:"Admin Not Found"
            })
        }
        if(!name || !email || !phone || !address){
            return res.status(400).json({
                success:false,
                message:"All fields required"
            })
        }
        let imagePath;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      imagePath = req.body.image;
    }
        const updateedAdmin = await User.findByIdAndUpdate(req.user._id,{name,email,phone,address,profile:imagePath},{new:true});
        return res.status(200).json({
            success:true,
            message:"Admin Profile Update Successfull",
            admin:updateedAdmin
        })
    } catch (error) {
        return res.status(400).json({
                success:false,
                message:error.message
            })
    }
}