const router = require("express").Router();

const {updateUser,deleteUser,getUser,followUser,unfollowUser} = require('../Controllers/user')

router.put('/update-user/:id',updateUser)
router.delete('/delete-user/:id',deleteUser)
router.get('/get-user/:id',getUser)
router.put('/follow/:id',followUser)
router.put('/unfollow/:id',unfollowUser)

module.exports = router;