import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

import dns from "dns";

// Set custom DNS servers (Google DNS)
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
    try {
        const connectionIntance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n mongoDB connected !! Db Host : ${connectionIntance.connection.host}`);
        
    } catch (error) {
        console.log("MongoDB connection FAILED", error);
        process.exit(1)
        
    }
}

export default connectDB