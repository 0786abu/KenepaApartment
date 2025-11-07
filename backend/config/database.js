import mongoose from "mongoose";


const Database = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB!",con.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default Database;