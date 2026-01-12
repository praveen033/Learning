import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
  {
    avatar: {
      type: {
        URL: String,
        localPath: String,
      },
      default: {
        url: ``,
        localPath: "",
      },
    },
    userName: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      required: [true, `User Name is required`],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      required: [true, `Email id is required.`],
    },
    fullName: { type: String, trim: true },
    password: { type: String, required: [true, "Password is required"] },
    isEmailVerified: { type: Boolean, default: false },
    refreshToken: { type: String },
    forgotPassword: { type: String },
    forgotPasswordExpiry: { type: Date },
    emailVerificationToken: { type: String },
    emailVerificationExpiry: { type: Date },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// userSchema.pre("save", async function (next) {
//   if (!this.isModified(this.forgotPassword)) return next();
//   this.forgotPassword = await bcrypt.hash(this.forgotPassword, 10);
// });

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jsonwebtoken.sign(
    { _id: this._id, userName: this.userName, email: this.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jsonwebtoken.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
  );
};

userSchema.methods.generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(10).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  const tokenExpiry = Date.now() + 20 * 60 * 1000; //20mins
  return { unHashedToken, hashedToken, tokenExpiry };
};

userSchema.methods.deleteUser = async function (userid) {
  await User.deleteOne({ _id: userid });
};

export const User = mongoose.model("User", userSchema);
