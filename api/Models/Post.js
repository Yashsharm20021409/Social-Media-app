const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            max: 500,
        },
        img: {
            type: String,
        },
        likes: {
            type: Array,
            default: []
        },
        comments: [
            {
                profilePicture: {
                    type: String,
                    default: ""
                },
                name:{
                    type:String,
                },
                username: {
                    type: String,
                },
                commenterId: {
                    type: String,
                    required: true,
                },
                text: {
                    type: String,
                    required: true,
                },
                timestamp: {
                    type: Date,
                    default: Date.now
                }
            }
        ],

    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);