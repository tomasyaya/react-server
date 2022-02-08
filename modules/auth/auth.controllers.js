const User = require("./user.model");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

function validationError(error) {
  return error instanceof mongoose.Error.ValidationError;
}

function isMongoError(error) {
  return error.code === 11000;
}

async function signup(req, res) {
  try {
    const { email, password } = req.body;
    // check if there is an email or password in the request
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    // because the email is unique we can use it to see it there is already a user registered with it
    const hasUser = await User.findOne({ email }).lean();

    // if there is already a user with that email then send a 400
    if (hasUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salRounds = 10; // sal complexity
    const salt = await bcrypt.genSalt(salRounds); // create the salt (random string)
    const hashedPassword = await bcrypt.hash(password, salt); // hashed the password with the salt
    const user = await User.create({ email, password: hashedPassword }); // save the hashed password in the user

    // here we create the user object inside the session object to be able to retrieve it from any request
    const userWithoutPass = { email: user.email, _id: user._id };

    req.session.user = userWithoutPass;

    return res.status(200).json(userWithoutPass);
  } catch (error) {
    if (validationError(error)) {
      return res.status(400).json({ message: error.message });
    }
    if (isMongoError(error)) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    // check if there is an email or password in the request
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    // see if there is a user already registered with the email
    const user = await User.findOne({ email }).lean();

    // if there is no user we send an error because you should signup first
    if (!user) {
      return res.status(400).json({ message: "User not found, please signup" });
    }

    // compare the password send over http and the one saved in the user model in mongo
    const hasCorrectPassword = await bcrypt.compare(password, user.password);

    if (hasCorrectPassword) {
      // if the password is the same then create the user object in the session and return a 200 to the client
      const userWithoutPass = { email: user.email, _id: user._id };
      req.session.user = userWithoutPass;
      return res.status(200).json(userWithoutPass);
    }

    return res.status(400).json({ message: "wrong passwords" });
  } catch (error) {
    if (validationError(error)) {
      return res.status(400).json({ message: error.message });
    }
    if (isMongoError(error)) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
}

// logout will destroy the session object with the user key
async function logout(req, res) {
  try {
    await req.session.destroy();
    return res.status(200).json({ message: "logout" });
  } catch (err) {
    res.status(500).json({ error: err.messages });
  }
}

// this controller is to check if there is a user in the session
// if there is not then that means you are not logged in and we respond with an error
async function getLoggedInUser(req, res) {
  try {
    const user = req.session.user;
    if (!user) {
      return res.status(400).json(null);
    }
    res.status(200).json(user);
  } catch (err) {}
}

module.exports = { signup, login, logout, getLoggedInUser };
