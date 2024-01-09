const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDatabase = require('./connect')



// to echange data between server and client using json
connectToDatabase();

// configurations
app.use(express.json());
app.use(bodyParser.json());
//to store cookies
// app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }
))
dotenv.config();


// Routes
const authRoutes = require('./Routes/auth')


app.use('/api/auth', authRoutes)


app.listen(5000, () => {
    console.log("Social Media app listening on port http://localhost:5000")
})