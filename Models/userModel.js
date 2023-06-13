const mongoose = require("mongoose");

// 사용자 등록을 위한 mongoDB 데이터 Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    password: { type: String, required: true, minlength: 6, maxlength: 1024 },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
