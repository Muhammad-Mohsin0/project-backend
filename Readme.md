# backend series

This series on backend with javaScript

[Model link](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)

- npm init
- Create the ("type": "module",) in package.json
- Install the Nodemon for when the files saved and automatically restart the server ["dev": "nodemon src/index.js"]
- Add prettier npm i -D prettier
- Setup MongoDB and take URL from offical site
- npm i mongoose express dotenv
- Create the connection in db directory for Data base.
- Must used try-catch & async-await(Dhyan rakho) for conection to Database
- Used the dotenv in src/index.js file as "require('dotenv').config({path : "./env"})" but here i import that & add in package.json "dev":....
- Remember app.use() used when middleware or configration setting needed.
- npm i cookie-parser cors 
- npm i mongoose-aggregate-paginate-v2      // use for aggregation pipline , // useplugin() hook
- npm i jsonwebtoken   // create ACCESS_TOKEN...   And   //REFRESH_TOKEN in .env file
- npm i bcrypt        // use in Pre() hook with //hash() and //campare()  
- npm i cloudinary     // Uploads the file from your server to cloud
- npm i multer   //Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
- import fs from "fs"    // file system , for remove the locally saved temp file as the uplaod opration got fail.
- HTTP (Hyper Text Transfer Protocol) 
- Create Controllers , Routes and in app.js set routes import etc
- In user.controller.js write code for user details, validation and other more written in comments... 
- Send data in database and cloudinary using postman to POST method. 
- Create New Collection and Enviroment Variables(server) add in newcollection "{{server}}/users/register" to maintain the Api
- Create login controller and perform the algo. written in comments, also create token functionality
- Create logout controller and create auth.middleware.js for delete the token
- Create refreshAccessToken endpoint in usee.controller
- Create subscription model & changeCurrentPassword in user.controller 
- Create aggregation, pipelines $lookup, $match ...