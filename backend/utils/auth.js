import User from "../model/AuthModel.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async(req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token) return res.status(401).json({success: false, message: 'Token not provided please login again'});
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({success: false, message: 'Token is invalid, please login again'});
    }
}


export const isAuthorized = (...roles) => {
    return (req, res, next) => {
        if(!req.user) return res.status(401).json({success: false, message: 'Unauthorized, please login again'});
        if(!roles.includes(req.user.role)) return res.status(403).json({success: false, message:`${req.user.role} is not authorized to access this route`});
        next();
    }
}