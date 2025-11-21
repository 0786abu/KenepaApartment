import Car from "../model/carModel.js";

export const createCar = async (req, res) => {
  try {
    const {
      carName,
      description,
      location,
      price,
      google_map_link,
      carType,
      carRentDuration,
      carModel,
    } = req.body;
     
    const property_poster = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profile: req.user.profile,
    };
    console.log(
      "hello"
    )

    if (!carName || !description || !location || !price) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please add property images",
      });
    }
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    const newCar = await Car.create({
      carName,
      description,
      location,
      price,
      google_map_link,
      carType,
      carRentDuration,
      images,
      property_poster,
      carModel,
    });

    res.status(201).json({
      success: true,
      message: "Car created successfully",
      car: newCar,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json({ success: true, car });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      carName,
      description,
      location,
      price,
      google_map_link,
      carType,
      carRentDuration,
      carModel,
    } = req.body;

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
    
            // 3. Final images → purani jo rakhni hain + nayi jo upload hui
            const finalImages = [...existingImages, ...newImages];


    // Step 3: Update car details
    const updatedCar = await Car.findByIdAndUpdate(
      id,
      {
        carName,
        description,
        location,
        price,
        google_map_link,
        carType,
        carRentDuration,
        carModel,
        images:finalImages
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message:
        req.files && req.files.length > 0
          ? "Car updated successfully with new images"
          : "Car updated successfully (no new images uploaded)",
      car: updatedCar
    });
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const car = await Car.findById(id);
    if (!car) return res.status(404).json({ message: "Car not found" });

    await car.deleteOne();
    res.status(200).json({ success: true, message: "Car deleted successfully",car });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllCars = async (req, res) => {
  try {
    const { address, carType, carModel, minPrice, maxPrice } = req.query;

    // 🧩 Start with base filter
    const filter = { isavailable: true };

    // 🔍 Apply address filter (partial match, case-insensitive)
    if (address) {
      filter["location.address"] = { $regex: address, $options: "i" };
    }

    // 🕒 Apply rent duration filter
    if (carType) {
      filter.carType = carType;
    }
    if (carModel) {
      filter.carModel = carModel;
    }
       if (minPrice && maxPrice) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      filter.price = { $gte: minPrice };
    } else if (maxPrice) {
      filter.price = { $lte: maxPrice };
    }
        

    // 🧠 Fetch from DB with filter applied
    const cars = await Car.find(filter);
    const allcars = await Car.countDocuments();

    // 🟢 Response
    res.status(200).json({
      success: true,
      cars,
      allcars
    });
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching cars",
    });
  }
};
