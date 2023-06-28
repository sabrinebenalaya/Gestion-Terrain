const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  email: { required: true, type: String, unique: true },
  password: { required: true, type: String },
  
  phone: { required: true, type: Number },
  photo: { required: false, type: String },
  status: { required: false, type: Boolean , default: true},
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Partner",
    required: true,
  },
});


module.exports = mongoose.model("User", userSchema);
