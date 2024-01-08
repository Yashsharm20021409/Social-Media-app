const express  =  require('express')
const app = express()
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDatabase = require('./connect')



// to echange data between server and client using json
connectToDatabase();

// configurations
app.use(express.json());
//to store cookies
app.use(cookieParser());
app.use(cors())
dotenv.config(); 


// Routes
const authRoutes = require('./Routes/auth')


app.use('/api/auth',authRoutes)


app.listen(5000,()=>{
    console.log("Social Media app listening on port http://localhost:5000")
})