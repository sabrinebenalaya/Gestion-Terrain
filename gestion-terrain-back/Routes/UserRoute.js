const express = require("express");


const router = express.Router();
const userController = require('../Controller/UserController')


router.post("/add", userController.addUser);
router.get("/getUsers", userController.getAllUsers);
router.get("/getuser/:id", userController.getUserById);
router.put("/update/:id", userController.update);
router.delete("/delete/:id", userController.deleteUser);



module.exports = router;


