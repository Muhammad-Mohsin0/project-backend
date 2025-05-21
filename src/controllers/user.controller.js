import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async(req, res) => {
   // get user details from frontend 
   // validation - not empty
   // check if user already exits : username & email 
   // check for images and check for avatar
   // upload them to cloudinary => check url from "uploadResult" & avatar
   // create user object (nosql) - create entry in db
   // remove password and refresh token fields from "uploadResult"
   // check for user creation 
   // return res

  const {username, email, password, fullName} = req.body                       // data coming from in form and json then .body
})

export {registerUser}