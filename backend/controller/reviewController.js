import Feat_City from "../model/featuredcityModel.js";
import Review from "../model/reviewModel.js";

export const Create_Customer_Review = async(req,res)=>{
    try {
        const {name,position,message} = req.body;
        if(!name ||!position ||!message){
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields'
            });
        }
        if(!req.file){
            return res.status(400).json({
                success: false,
                message: 'profile pic required'
            });
        }
        const profile = req.file ? `/uploads/${req.file.filename}` : null;
        const review = await Review.create({name,position,profile,message});
        res.status(200).json({
            success: true,
            message: 'Review created successfully',
            review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const Get_Customer_Reviews = async(req,res)=>{
    try {
        const reviews = await Review.find();
        res.status(200).json({
            success: true,
            message: 'Reviews fetched successfully',
            reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

    export const Update_Customer_Review = async(req,res)=>{
        try {
            const {id} = req.params;
            const {name,position,profile,message} = req.body;
            const review = await Review.findByIdAndUpdate(id,{name,position,message},{new:true});
            if(!review){
                return res.status(404).json({
                    success: false,
                    message: 'Review not found'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Review updated successfully',
                review
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    export const Delete_Customer_Review = async(req,res)=>{
        try {
            const {id} = req.params;
            const review = await Review.findByIdAndDelete(id);
            if(!review){
                return res.status(404).json({
                    success: false,
                    message: 'Review not found'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Review deleted successfully',
                review
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

export const create_Feature_City = async (req, res) => {
    try {
        const {cityname,total_properties} = req.body;
        if(!cityname ||!total_properties){
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields'
            });
        }
        const poster = {
            id:req.user._id,
            name: req.user.name,
            email: req.user.email,
            profile: req.user.profile

        }
        if(!req.file){
            return res.status(400).json({
        success: false,
        message: "Please image",
      });
        }
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const featureCity = await Feat_City.create({cityname,total_properties,image,poster});
        res.status(200).json({
            success: true,
            message: 'Featured city created successfully',
            featureCity
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const get_Featured_Cities = async (req, res) => {
    try {
        const featureCities = await Feat_City.find();
        res.status(200).json({
            success: true,
            message: 'Featured cities fetched successfully',
            featureCities
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}   

export const update_Feature_City = async (req, res) => {
    try {
        const {id} = req.params;
        const {cityname,total_properties} = req.body;

        const featureCity = await Feat_City.findByIdAndUpdate(id,{cityname,total_properties},{new:true});
        if(!featureCity){
            return res.status(404).json({
                success: false,
                message: 'Featured city not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Featured city updated successfully',
            featureCity
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const delete_Feature_City = async (req, res) => {
    try {
        const {id} = req.params;
        const featureCity = await Feat_City.findByIdAndDelete(id);
        if(!featureCity){
            return res.status(404).json({
                success: false,
                message: 'Featured city not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Featured city deleted successfully',
            featureCity
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}