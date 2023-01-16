const mongoose = require("mongoose");
//const bcrypt = require("bcryptjs");

const ROLE = {
  ADMIN: "admin",
  BASIC: "basic",
  GUEST: "guest",
  SUPERUSER: "superuser",
  SUPERVISOR: "supervisor",
  MODERATOR: "moderator",
  PREMIUM: "premium",
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: Object.values(ROLE),
    default: ROLE.BASIC,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  tokens: [{
    token: {
        type: String,
        required: true
    }
  }]
});

// // Hash the user's password before saving it to the database
// userSchema.pre("save", async function (next) {
//   try {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Compare the plain text password with the hashed password
// userSchema.methods.isValidPassword = async function (password) {
//   try {
//     return await bcrypt.compare(password, this.password);
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// userSchema.methods.verifyPassword = function (password) {
//   return this.isValidPassword(password);
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
