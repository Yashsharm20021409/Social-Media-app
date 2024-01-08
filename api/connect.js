const mongoose = require('mongoose')
const dotenv = require('dotenv')


dotenv.config()
const connectToDatabase = ()=>{
    mongoose.connect(process.env.Mongo_URL).then((data)=>{
        console.log(`Mongoose Connected with the Server Successfully`)
    }).catch((error)=>{
        console.log(error) 
    })
}

module.exports = connectToDatabase; 