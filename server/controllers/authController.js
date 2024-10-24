const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");

const test = (req, res) => {
  res.json("test is working");
};

//register user endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check if name was entered
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    // check if password was entered
    if (!password || password.length < 6) {
      return res.json({
        error: "password is required and shoudl'nt be less than 6 characters",
      });
    }

    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    //check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is already taken",
      });
    }

    const hashedPassword = await hashPassword(password);
    //create user in database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//login user endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    //check if passwords match
    const match = await comparePassword(password, user.password);
    if (match) {
      res.json("Passwords match");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
};
