import Contact from "../model/contactModel.js";

export const Create_Contact = async(req,res)=>{
    try {
        const {name,email,phone,address,message} = req.body;
        if(!name ||!email ||!phone ||!address ||!message){
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields'
            });
        }
        const contact = await Contact.create({name,email,phone,address,message});
        res.json({
            success: true,
            message: 'Contact created successfully',
            contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const Get_Contacts = async(req,res)=>{
    try {
        const contacts = await Contact.find();
        res.json({
            success: true,
            message: 'Contacts fetched successfully',
            contacts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            contacts
        });
    }
}

export const Update_Contact = async(req,res)=>{
    try {
        const {id} = req.params;
        const {name,email,phone,address,message} = req.body;
        const contact = await Contact.findByIdAndUpdate(id,{name,email,phone,address,message},{new:true});
        if(!contact){
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        res.json({
            success: true,
            message: 'Contact updated successfully',
            contact
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const Delete_Contact = async(req,res)=>{
    try {
        const {id} = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        if(!contact){
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        res.json({
            success: true,
            message: 'Contact deleted successfully',
            contact
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}