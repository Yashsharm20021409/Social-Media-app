const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../Models/User')


// Register User 
exports.register = async (req, res) => {
    try {
        // console.log("hi");
        const { email, username } = req.body;
        const userEmail = await User.findOne({ email });
        const userName = await User.findOne({ username });

        if (userName) {
            return res.status(409).json("UserName Already Exists!");
        }
        if (userEmail) {
            return res.status(409).json("Email Id Already Exists!");
        }

        // genrate password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            name: req.body.name,
        });

        // save user
        const user = await newUser.save();
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json(error)
    }
}


// Login User
exports.login = async (req, res) => {
    try {
        // check user exists or not
        // console.log(req.body)
        const user = await User.findOne({ username: req.body.username });

        if(!user){
            return res.status(404).json('Incorrect Username! Please Enter Correct Credentails');
        }

        // password compare
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if(!validPassword){
            return res.status(400).json('Incorrect password! Please Enter Correct Credentails');
        }
        user.password = undefined;
        user.email = undefined,
        user.createdAt = undefined,
        user.email = "sharma.yash.07@gmail.com"
        user.updatedAt = undefined
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json(error);
    }
}

// logout user
exports.logout = (req, res) => {
}