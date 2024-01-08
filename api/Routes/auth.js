const express = require('express')
const router = express.Router();

const {login , register , logout} = require("../Controllers/auth")

router.post('/register',register)
router.get('/login',login)
router.get('/logout',logout);

module.exports = router;