import Property from "../model/propertyModel.js";

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();



export const Property_create = async (req, res) => {
  try {
    const {
      title,
      description,
      property_detail,
      location,
      price,
      google_map_link,
      property_type,
      size,
      category,
      rooms,
      bathrooms,
      years_of_build,
      posteddate,
      propertyDuration
    } = req.body;

    // ✅ Generate unique Property ID
    const propertyid = Math.floor(100000 + Math.random() * 900000);

    // ✅ Poster info (assuming `req.user` set by auth middleware)
    const property_poster = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profile: req.user.profile,
    };
    // ✅ Image validation
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please add property images",
      });
    }
    const availabilities = JSON.parse(req.body.availabilities);
    const amenities = JSON.parse(req.body.amenities);

    // ✅ Generate uploaded image URLs (from multer)
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    // ✅ Validate required fields
    if (
      !title ||
      !description ||
      !location ||
      !price ||
      !property_type ||
      !property_detail ||
      !propertyid ||
      !size ||
      !category ||
      !rooms ||
      !bathrooms ||
      !property_poster ||
      !posteddate ||
      !propertyDuration
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All required fields must be filled." });
    }

    // ✅ Check if property already exists (by propertyid)
    const existingProperty = await Property.findOne({ propertyid });
    if (existingProperty) {
      return res
        .status(400)
        .json({ success: false, message: "Property ID already exists." });
    }

    // ✅ Create and save new property
    const newProperty = await Property.create({
      title,
      description,
      location,
      price,
      google_map_link,
      property_type,
      propertyid,
      size,
      images, // ⬅️ multer uploaded image paths
      amenities,
      category,
      rooms,
      bathrooms,
      property_poster,
      years_of_build,
      property_detail,
      posteddate,
      propertyDuration,
      availabilities
    });

    return res.status(201).json({
      success: true,
      message: "Property created successfully",
      property: newProperty,
    });
  } catch (error) {
    console.error("Property creation error:", error);
    return res
      .status(500)
      .json({ success: false, message: error.message || "Internal Server Error" });
  }
};


export const Fetch_Properties = async (req, res) => {
    try {
        const { category, address, propertyDuration, property_type, amenities, minPrice, maxPrice } = req.query;
        
        let filter = {isavailable:true};
        
        if (category) {
            filter.category = category;
        }
        if (propertyDuration) {
            filter.propertyDuration = propertyDuration;
        }
        if (address) {
            filter["location.address"] = { $regex: new RegExp(address, "i") }; // Case-insensitive search
        }
        if (property_type) {
            filter.property_type = property_type;
        }
        if (amenities) {
            const amenitiesArray = amenities.split(",").map(amenity => amenity.trim());
            filter.amenities = { 
                $all: amenitiesArray.map(amenity => new RegExp(`^${amenity}$`, "i")) 
            };
        }
         if (minPrice && maxPrice) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      filter.price = { $gte: minPrice };
    } else if (maxPrice) {
      filter.price = { $lte: maxPrice };
    }
        
        
        const properties = await Property.find(filter);
        res.status(200).json({
            success: true,
            message: "Properties fetched successfully",
            count: properties.length,
            properties
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const Admin_Fetch_All_Properties = async(req,res)=>{
    try {
        const properties = await Property.find();
        res.status(200).json({
            success: true,
            message: "All properties fetched successfully",
            properties
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const Fetch_Property_Details = async (req, res) => {
    try {
        const {id} = req.params;
        const property = await Property.findById(id);
        
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Property fetched successfully",
            property
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const Create_rating = async (req, res) => {
    try {
        const { message, rating } = req.body;
        const { id } = req.params;

        const property = await Property.findById(id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        // Find if the user has already rated the property
        const existingPropertyRating = property.reviews.find(
            (r) => r.userid.toString() === req.user._id.toString()
        );

        if (existingPropertyRating) {
            existingPropertyRating.name = req.user.name;
            existingPropertyRating.profile = req.user.profile;
            existingPropertyRating.userid = req.user._id;
            existingPropertyRating.rating = rating;
            existingPropertyRating.message = message;
        } else {
            // Add new rating
            property.reviews.push({
                userid: req.user._id,
                name: req.user.name,
                profile: req.user.profile,
                message,
                rating
            });
        }

        // Recalculate rating
        const numberOfReviews = property.reviews.length;
        const totalRating = property.reviews.reduce((acc, curr) => acc + curr.rating, 0);
        property.rating = parseFloat(totalRating / numberOfReviews).toFixed(1);
        property.numofreviews = numberOfReviews;

        await property.save();

        res.status(200).json({
            success: true,
            message: existingPropertyRating ? "Rating updated successfully" : "Rating created successfully",
            property
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const Update_Property = async(req, res) => {
    try {
        const {
            title, description,property_detail, location, price, google_map_link, property_type, size, category, rooms, bathrooms, years_of_build, propertyDuration
        } = req.body;
        const { id } = req.params;
        if(!id){
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }
        // -------- IMAGE LOGIC START --------

        // 1. Purani images jo admin ne nahi delete ki
        let existingImages = [];
        if (req.body.existingImages) {
            existingImages = JSON.parse(req.body.existingImages); 
            // frontend se array string me aata hai
        }

        // 2. Agar admin ne nayi images upload ki using multer
        let newImages = [];
        if (req.files && req.files.length > 0) {
            newImages = req.files.map((file) => file.path); 
            // Cloud or uploads folder ka path milega
        }
        const availabilities = JSON.parse(req.body.availabilities)
        const amenities = JSON.parse(req.body.amenities)

        // 3. Final images → purani jo rakhni hain + nayi jo upload hui
        const finalImages = [...existingImages, ...newImages];
        const property = await Property.findByIdAndUpdate(id,{title, description,property_detail, location, price, google_map_link, property_type, size, images:finalImages, amenities, category, rooms, bathrooms, years_of_build, propertyDuration, availabilities},{new:true});
        
        res.status(200).json({
            success: true,
            message: "Property updated successfully",
            property
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const Delete_Property = async(req,res)=>{
    try {
        const {id} = req.params;
        const property = await Property.findByIdAndDelete(id);
        
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Property deleted successfully",
            property
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const FeaturedCCity_Property_Toggle = async(req,res)=>{
    try {
        const {featuredcity} = req.body;
        const property = await Property.findById();
        
        property.location.featuredcity = featuredcity;
        await property.save();
        res.status(200).json({
            success: true,
            message: "Property featured successfully",
            property
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const Featured_Property_Toggle = async(req,res)=>{
    try {
        const {id} = req.params;
        const property = await Property.findById(id);
        
        property.featured =!property.featured;
        await property.save();
        res.status(200).json({
            success: true,
            message: `Property featured ${property.featured} successfully`,
            property
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



export const sendEmailToUser = async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // ✅ Configure Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASS,
      },
    });

    // ✅ Email Options
    const mailOptions = {
      from: `"Keneparesort"`,
      to: to, // user email
      subject: "Message from Admin",
      html: `
        <div style="font-family:sans-serif;">
          <h3>📩 Message from Admin</h3>
          <p>${message}</p>
          <hr/>
          <p style="font-size:13px;color:#777;">This email was sent automatically from the Admin Panel.</p>
        </div>
      `,
    };

    // ✅ Send Email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: `Email successfully sent to ${to}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
