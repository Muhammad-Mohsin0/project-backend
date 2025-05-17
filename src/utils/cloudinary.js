import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const uploadOnCloudinary = async (localFilePath) => {
        try {
            if (!localFilePath) return null 
            // upload the file on cloudinary
           const uploadResult = await  cloudinary.uploader.upload(localFilePath, {
            resource_type : "auto",
           })
            // file is uploaded is successfully

            console.log("file is uploaded successfully", uploadResult.url);
            return uploadResult
            
        } catch (error) {
            fs.unlinkSync(localFilePath)  // remove the locally saved temp file as the uplaod opration got fail
            return null 
        }
    }
     export {uploadOnCloudinary}