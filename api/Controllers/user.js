const User = require("../Models/User");
const bcrypt = require('bcryptjs');


exports.updateUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update only your account!");
    }

}

exports.deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        // we removed pass,createdAt from user doc and store other things in other obj
        const { password, createdAt, updatedAt, __v, ...other } = user._doc;
        res.status(200).json(other);

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.followUser = async (req, res) => {

    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            // check if already not a friends then only approve request
            if (!user.follwers.includes(req.body.userId)) {
                // push the userId into the followers list of user 
                // we are using push here bcoz we are pushing some id in list of followers/followings
                await user.updateOne({ $push: { follwers: req.body.userId } });
                // push the userId of user into the following list of currentUser(a person you want to follow)
                await currentUser.updateOne({ $push: { following: req.params.id } });

                res.status(200).json("User has been followed")
            }
            else {
                res.status(403).json("you allready follow this user");
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("you cant follow yourself");
    }
}

exports.unfollowUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.follwers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { follwers: req.body.userId } });
                await currentUser.updateOne({ $pull: { following: req.params.id } });
                res.status(200).json("user has been unfollowed");
            } else {
                res.status(403).json("you dont follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant unfollow yourself");
    }
}
