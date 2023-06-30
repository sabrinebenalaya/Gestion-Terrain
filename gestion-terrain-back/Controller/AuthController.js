const Partner = require("../Model/Partner");
const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ValidateLogin = require("../Validator/ValidateLogin");
const ValidateRegister = require("../Validator/ValidateRegister");

const authController = {};

//Register
authController.regitser = async (req, res) => {
  const partner = req.body;

  const { errors, isValid } = ValidateRegister(partner);

  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      const partnerExist = await Partner.findOne({
        $or: [{ email: partner.email }],
      });

      if (partnerExist) {
        res
          .status(400)
          .json({ msg: "Partner already exist you sould login 😜" });
      } else {
        const partner = new Partner(req.body);
        const hashedPaswword = await bcrypt.hash(partner.password, 10);
        partner.password = hashedPaswword;
        await partner.save();

        res.status(200).json({ partner });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//log in
authController.login = async (req, res) => {
  const partnerInfo = req.body;

  try {
    const { errors, isValid } = ValidateLogin(partnerInfo);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const partner = await Partner.findOne({ email: partnerInfo.email });
    const user = await User.findOne({ email: partnerInfo.email });

    if (!partner && !user) {
      errors.email = "You must register before 😊";
      return res.status(400).json(errors);
    }

    let entity, entityType;

    if (partner) {
      entity = partner;
      entityType = 'partner';
    } else {
      entity = user;
      entityType = 'user';
    }

    const isPasswordCorrect = await bcrypt.compare(
      partnerInfo.password,
      entity.password
    );

    if (!isPasswordCorrect) {
      errors.password = "Wrong password 🤦";
      return res.status(401).json(errors);
    }

    const token = jwt.sign({ id: entity._id }, process.env.SECRET_KEY);

    res.status(200).json({ [entityType]: entity, token });
  } catch (error) {
    res.status(500).json({ msg: "Server failed ✋" });
  }
};

//Log out
authController.logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json("You are now logged out 😔");
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "server failed ⚠️" }] });
  }
};

module.exports = authController;
