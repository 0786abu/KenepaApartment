import Service from "../model/servicesModal.js";

export const Create_Service = async(req,res)=>{
    try {
        const {service_title,service_description,service_icon} = req.body;
        if(!service_title ||!service_description ||!service_icon){
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields'
            });
        }
        const poster = {
            userid:req.user._id,
            name: req.user.name,
            email: req.user.email,
            profile: req.user.profile
        }
        const service = await Service.create({service_title,service_description,service_icon,poster});
        res.json({
            success: true,
            message: 'Service created successfully',
            service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const Get_Services = async(req,res)=>{
    try {
        const services = await Service.find();
        res.json({
            success: true,
            message: 'Services fetched successfully',
            services
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const Update_Service = async(req,res)=>{
    try {
        const {id} = req.params;
        const {service_title,service_description,service_icon} = req.body;
        const service = await Service.findByIdAndUpdate(id,{service_title,service_description,service_icon},{new:true});
        
        if(!service){
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        res.json({
            success: true,
            message: 'Service updated successfully',
            service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const Delete_Service = async(req,res)=>{
    try {
        const {id} = req.params;
        const service = await Service.findByIdAndDelete(id);
        
        if(!service){
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        res.json({
            success: true,
            message: 'Service deleted successfully',
            service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}