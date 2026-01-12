import { User } from "../models/user.models.js";
import { api_errors } from "../utils/api_errors.js";
import { api_response } from "../utils/api_response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { sendEmail, emailVerificationMailGen } from "../utils/mailGen.js";

const generateAccessAndRefrestToken = async (userid) => {
  try {
    const user = await User.findById(userid);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    User.deleteUser(userid);
    throw new api_errors(
      500,
      `error occured at the time of Token generation.`,
      error,
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, role } = req.body;
  console.log(userName, email);
  const existingUser = await User.findOne({
    $or: [{ username: userName }, { email: email }],
  });

  if (existingUser) {
    throw new api_errors(409, "User already exists", [
      `User already exists ${existingUser}`,
    ]);
  } else {
    const user = await User.create({
      userName,
      email,
      password,
      role,
      isEmailVerified: false,
    });
  }

  let user = await User.findOne({ userName });
  //const { AccessToken, RefreshToken } = generateAccessAndRefrestToken(user);
  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();
  generateAccessAndRefrestToken(user._id);
  // console.log(user);
  // console.log(user.userName);
  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user?.email,
    subject: `Email verification mail`,
    mailGenContent: emailVerificationMailGen(
      toLocaleUpperCase(user.userName),
      `${req.protocol}://${req.get("host")}/api/v1/users/verefy-email/${hashedToken}`,
    ),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -isEmailVerified -refreshToken -forgotPassword -forgotPasswordExpiry -emailVerificationToken -emailVerificationExpiry -avatar",
  );
  if (!createdUser) {
    User.deleteUser(user._id);
    throw new api_errors(
      201,
      `Something went wrong at the time of user registration`,
      [],
    );
  }

  return res
    .status(200)
    .json(
      new api_response(
        200,
        { user: createdUser },
        `User registered successfully & verification mail has been sended on you email.`,
      ),
    );
});

const login = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username) {
    throw new api_errors(400, "User name or Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new api_errors(400, `user does not exists`);
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new api_errors(400, `Invalid Password`);
  }

  const { accessToken, refreshToken } = await generateAccessAndRefrestToken(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -isEmailVerified -refreshToken -forgotPassword -forgotPasswordExpiry -emailVerificationToken -emailVerificationExpiry -avatar",
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new api_response(200, { user: loggedInUser, accessToken, refreshToken }),
      "USer logged in Successfully",
    );
});

export { registerUser, login };
