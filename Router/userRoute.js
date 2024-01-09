const express = require('express');
const app = express();
const router = express.Router();
const { register, login, checkUser} = require('../Controller/UserController');
const authmiddlware = require('../Middleware/authmiddleware');
router.post("/register", register)
router.post("/login", login)
router.get("/check", authmiddlware, checkUser)

module.exports = router
