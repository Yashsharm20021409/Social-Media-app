const User = require('../Models/User');
const Post = require('../Models/Post');

exports.createPost = async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json("Post not found");
        }
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("the post has been updated");
        } else {
            res.status(403).json("you can update only your post");
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        } else {
            res.status(403).json("you can delete only your post");
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.likeDislikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // check if not liked like it otherwise dislike it
        if (!post.likes.includes(req.body.userId)) {
            await Post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        }
        else {
            await Post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.comment = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error)
    }
}

// if request is get type don;t send id in body sent it as params for best practice because get header is highly secured
exports.getAllPost = async (req, res) => {
    try {
        // we will use promise here becuase we are using map here(means if you use any loop you have to loop promise allways)
        // if use only await it will not fetch all the posts that's why we are using promise
        const currentUser = await User.findById(req.params.userId);
        // if both have't any post use this [] array for concat
        // we have use find insted of findbyId becuase this usedId actual not a unique identifier given  by you it is system auto genrated objectId that's why you are getting error by findbyId
        const userPost = await Post.find({ userId: currentUser._id }) || [];

        // friends post
        const friendsPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        )

        const allData = userPost.concat(...friendsPosts);

        res.status(200).json(allData);
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.userPost = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
}