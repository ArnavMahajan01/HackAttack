const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.register = async (req, res) => {
  const { name, email, password, password2 } = req.body;

  if (!name || !email || !password || !password2) {
    res.status(400).json({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    res.status(400).json({ msg: "Password do not match" });
  }

  if (password.length < 3) {
    res.status(400).json({ msg: "Password must be at least 3 characters" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (user != null) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => {
            res.status(200).json({ msg: "Register Successful" });
          })
          .catch((err) => console.log(err));
      });
    });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

exports.login = async (req, res, next) => {
  /* Authenticating if login was successful or
      not with the help of passport */
  let email = req.body.email;
  let password = req.body.password;

  try {
    const user = await User.findOne({ email: email });

    if (!email || !password) {
      return res.status(404).send({
        msg: "Enter the credentials",
      });
    }

    if (user === null) {
      return res.status(404).send({
        msg: "This email is not Registered",
      });
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return res.status(400).send({
        msg: "Invalid Credentials",
      });
    }

    const access_token = jwt.sign(
      { data: { email: email, id: user.id } },
      process.env.VERIFY_AUTH_TOKEN,
      {
        expiresIn: "300m",
      }
    );
    res.status(200).json({ msg: "User Logged In", accessToken: access_token });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

exports.logout = (req, res) => {
  req.logout();
  /* Logging out */
  res.status(200).send("User Logout");
};
