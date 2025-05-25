import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const generateAccessTokenAndRefreshTokens = async (userId) =>{
  try {

    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave : false })  // refresh token saved in database 

    return { accessToken, refreshToken}

  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating access and refresh token")
  }
}

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
  // console.log("email: " ,email)
  // console.log("password: " ,password)
  // console.log(req.body)

  if( [fullName, username ,email, password].some ((field) => 
   field?.trim() === "")){
  throw new ApiError(400, "All fields required")
  }

  //
  if(!email.includes("@")){
     throw new ApiError(400, "invalid email format")
  }

  //
  const existedUser = await User.findOne({
    $or : [{ username }, { email }]
  })

  if (existedUser) {
    throw new ApiError(409, "User is already existed with email or username")
  }
  // console.log(req.files)

  
  //
  const avatarLocalPath = req.files?.avatar[0]?.path;
   if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
  }

  // const coverImageLocalPath =  req.files?.coverImage[0]?.path;
  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath =  req.files.coverImage[0].path;
  }

  //
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
  }

  //
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  })

  //checked the user creation & remove password refreshToken
  const createdOrNotUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
    if (!createdOrNotUser) {
      throw new ApiError(500, "Something went wrong while registering the user")
    }
  
    //
    return res.status(201).json(
      new ApiResponse(200, createdOrNotUser, "User Registered successfully ")
    )
})

const loginUser = asyncHandler(async (req, res) => {
      // req body -> data
      // username or email 
      // find the user , if not req  is not available
      // password check   if not then wrong password
      // access and refresh token generate and send to user
      // send in cookies(secure cookies) 
      // send a response user login successfully

      //
      const {email, username, password} = req.body

      //
      if (!username && !email) {
        throw new ApiError(400, "username and email is required")
      }
      // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
        
    // }

      //
      const user = await User.findOne({
        $or: [{username}, {email}]
      })
       
      if (!user) {
        throw new ApiError(404, "user does not exist")
      }

      //
      const isPasswordValid = await user.isPasswordCorrect(password)

      if (!isPasswordValid) {
        throw new ApiError(401, "Password is incorrect")
      }

      const { accessToken, refreshToken } =await generateAccessTokenAndRefreshTokens(user._id)

      const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

      const options = {
        httpOnly : true,
        status: true
      }

      return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user : loggedInUser, accessToken, refreshToken
          },
          "User Loged In Successfully"
        )
      )
})

const logoutUser = asyncHandler( async ( req, res ) => {
  await User.findByIdAndUpdate(
          req.user._id,
          {
            $set: {
               refreshToken : undefined
            }
          },
          {
            new : true
          }
  )

   const options = {
        httpOnly : true,
        status: true
      }

      return res
      .status(200)
      .cookie("accessToken", options)
      .cookie("refreshToken",  options)
      .json(
        new ApiResponse(
          200,
          {},
          "User Loged out Successfully"
        )
      )
})
export {registerUser , loginUser, logoutUser}