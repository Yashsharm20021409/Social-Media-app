const express = require('express')
const router = express.Router();
const { createPost, updatePost, deletePost, likeDislikePost, getPost, getAllPost ,comment} = require('../Controllers/post');


router.post('/create-post', createPost);
router.put('/update-post/:id', updatePost);
router.delete('/delete-post/:id', deletePost);
router.put('/like-dislike/:id', likeDislikePost);
router.put('/comment/:id',comment)
router.get('/timeline/:userId', getAllPost);
router.get('/:id', getPost);

module.exports = router;