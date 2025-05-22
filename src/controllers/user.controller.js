import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

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

  const {username, email, password, fullName} = req.body                      // data coming from in form and json then .body
  console.log("email: " ,email)
  console.log("password: " ,password)

  if( [fullName, username ,email, password].some ((field) => 
   field?.trim() === "")){
  throw new ApiError(400, "All fields required")
  }

  //
  if(!email.includes("@")){
     throw new ApiError(400, "invalid email format")
  }

  //
  const existedUser = User.findOne({
    $or : [{ username }, { email }]
  })

  if (existedUser) {
    throw new ApiError(409, "User is already existed with email or username")
  }

  //
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath =  req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
  }

  //
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
  }

  //
  User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  })
})


export {registerUser}