const mongoose = require("mongoose");
const partnerSchema = mongoose.Schema({
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  email: { required: true, type: String, unique: true },
  password: { required: true, type: String },
  cin: { required: true, type: Number },
  phone: { required: true, type: Number },
  photo: { required: false, type: String },
  status: { required: false, type: Boolean , default: false},
});


module.exports = mongoose.model("Partner", partnerSchema);
