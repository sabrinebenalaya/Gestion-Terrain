const express = require("express");


const router = express.Router();
const authController = require('../Controller/AuthController')


router.post("/register", authController.regitser);
router.post("/logIn", authController.login);
router.get("/logOut", authController.logOut);



module.exports = router;


