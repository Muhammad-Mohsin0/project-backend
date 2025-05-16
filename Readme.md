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