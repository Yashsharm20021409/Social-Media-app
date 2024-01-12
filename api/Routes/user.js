const router = require("express").Router();

const {updateUser,deleteUser,getUser,followUser,unfollowUser,getAllFriends,getAllUsers} = require('../Controllers/user')

router.get("/friends/:userId",getAllFriends)
router.put('/update-user/:id',updateUser)
router.get("/suggestions/:id",getAllUsers);
router.delete('/delete-user/:id',deleteUser)
router.get('/',getUser)
router.put('/follow/:id',followUser)
router.put('/unfollow/:id',unfollowUser)

module.exports = router;