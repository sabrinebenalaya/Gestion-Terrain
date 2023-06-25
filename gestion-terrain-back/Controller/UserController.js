const User = require("../Model/User");
const ValidateUser = require('../Validator/ValidateUser') ;
const isEmpty = require("../Validator/IsEmpty");
const bcrypt = require("bcryptjs");
const userController = {};

// Create a user
userController.addUser = async (req, res) => {
  const { errors, isValid } = ValidateUser(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
  
    if (!req.body || !req.body.partner) {
      return res.status(400).json({ msg: "Invalid request. Missing 'newUser' or 'partner' property." });
    }

    const userExist = await User.findOne({
      partner: req.body.partner,
      email: req.body.email,
    });

    if (userExist === null) {
      const user = new User(req.body);
      console.log('user', user)
      const hashedPassword = await bcrypt.hash(String(user.password), 10);

      user.password = hashedPassword;

      await user.save();

      res.status(200).json({ user });
    } else {
      res.status(400).json({ msg: "User already exists, you should login 😜" });
    }
  }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Get all users
userController.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ partner: req.params.id });
    users
      ? res.status(200).json(users)
      : res.status(404).json("No user was found 😔");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific User by ID
userController.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user
      ? res.status(200).json(user)
      : res.status(404).json("User not found😔");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a User
userController.update = async (req, res) => {
  const { id } = req.params;

  const userToUpdate = JSON.parse(req.body.editUser);

  if (req.file) {
    const imagePath = req.file.path.replace(/\\/g, "/");
    const photoPath = `http://localhost:${process.env.PORT}/users/${imagePath}`;
    userToUpdate.photo = photoPath;
  }

  if (!isEmpty(userToUpdate.password)) {
    const hashedPaswword = await bcrypt.hash(userToUpdate.password, 10);
    userToUpdate.password = hashedPaswword;
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { ...userToUpdate } },
      {
        new: true,
        runValidators: true,
      }
    );

    user
      ? res.status(200).json(user)
      : res.status(404).json("User not found ⚠️");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a User
userController.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    user
      ? res.status(200).json("User deleted Successfully 😊")
      : res.status(404).json("User not found 😔");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = userController;
