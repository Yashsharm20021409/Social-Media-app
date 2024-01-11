const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDatabase = require('./connect')
const multer = require("multer");
const path = require("path");



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

// multer for file upload

app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploded successfully");
    } catch (error) {
        console.error(error);
    }
});


// Routes
const authRoutes = require('./Routes/auth');
const postRoute = require('./Routes/post');
const userRoute = require('./Routes/user');


app.use('/api/auth', authRoutes)
app.use('/api/post', postRoute)
app.use('/api/user', userRoute)


app.listen(5000, () => {
    console.log("Social Media app listening on port http://localhost:5000")
})