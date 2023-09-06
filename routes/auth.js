const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const User = require("../model/user");
const bcrypt =require("bcryptjs");
const {registerValidation, loginValidation} = require("../validation")
const jwt  = require("jsonwebtoken")


// user registration
router.get("/", (req,res)=>{
    res.send("in the users")
})

router.post("/register", async(req,res) =>{

    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(req.body.password, salt);

// ensure one email for one account
const emailExist = await User.findOne({email:req.body.email})
if(emailExist) return res.status(400).send('Email already exists')

//different username for each account
const usernameExist = await User.findOne({username:req.body.username})
if(usernameExist) return res.status(400).send('Username already Taken')

 const user = new User({
    firstname:req.body.firstname,
    secondname: req.body.secondname,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
 });

try {
    const savedUser = await user. save();
    res.status(200).send({user: savedUser._id});
} catch (err) {
    res.status(400).send({status:'failed', msg:err});
}
 }) 

//  login

router.post("/login", async (req, res) => {
  try {
    // Validate user login
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email');

    // Check the password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    // Create payload with user data
    const payload = {
      userId: user._id,
      email: user.email,
      firstName: user.firstname,
      secondName: user.secondname,
      favorites: user.favorites,
      
    };

    // Generate user token
    const secretOrPrivateKey = 'du3782sn7y4r6rtsduehd7';
    const token = jwt.sign(payload, secretOrPrivateKey);

    // Save the token in the user document in the database
    try {
      await User.findByIdAndUpdate(user._id, { authToken: token });

      // Prepare API response with token and user data
      const response = {
        message: 'Login successful',
        token: token,
        user: payload, // Include user data in the response
      };

      // Send the response
      res.header('auth-token', token).json(response);
    } catch (err) {
      res.status(500).send('Error saving token to the database');
    }
  } catch (err) {
    res.status(500).send('An error occurred');
  }
});

// Delete user account
router.delete("/delete/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const authHeader = req.header('Authorization');

    // If the auth header is not present, return an error
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send("Unauthorized");
    }

    const token = authHeader.substring(7); // Extract token from the "Bearer " prefix

    // Find the user by ID and auth token
    const user = await User.findOne({ _id: userId, authToken: token });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized or User not found" });
    }

    // Delete the user from the database
    await User.findByIdAndDelete(userId);

    res.status(200).send("Account deleted successfully");
  } catch (err) {
    res.status(500).send({ status: 'failed', msg: err });
  }
});  

// Update user information
router.patch("/update/:userId", async (req, res) => {
  const userId = req.params.userId; // Extract user ID from request params
  const authHeader = req.header('Authorization');

  try {
    // If the auth header is not present, return an error
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send("Unauthorized");
    }

    const token = authHeader.substring(7); // Extract token from the "Bearer " prefix

    // Find the user by ID and auth token
    const user = await User.findOne({ _id: userId, authToken: token });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized or User not found" });
    }

    const { username, firstname, secondname, email } = req.body;

    // Validate the new username, firstname, and secondname if provided
    if (username) {
      const usernameValidation = /^[a-zA-Z0-9_]{4,255}$/;
      if (!usernameValidation.test(username)) {
        return res.status(400).send("Invalid username format. Username must be 4 to 255 characters long and can only contain letters, numbers, and underscores.");
      }

      // Check if the new username is already taken by another user
      const usernameExist = await User.findOne({ username });
      if (usernameExist && usernameExist._id.toString() !== user._id.toString()) {
        return res.status(400).send('Username already taken');
      }

      user.username = username;
    }

    if (firstname) {
      if (firstname.length < 3 || firstname.length > 255) {
        return res.status(400).send("Firstname should be atleast 3 characters long.");
      }
      user.firstname = firstname;
    }

    if (secondname) {
      if (secondname.length < 3 || secondname.length > 255) {
        return res.status(400).send("Secondname should be atleast 3 characters long.");
      }
      user.secondname = secondname;
    }

    if (email) {
      // Validation logic for email uniqueness
      const emailExist = await User.findOne({ email });
      if (emailExist && emailExist._id.toString() !== user._id.toString()) {
        return res.status(400).send('Email in use');
      }
      // Assign the updated email
      user.email = email;
    }

    // Save the updated user information to the database
    await user.save();

    return res.status(200).send("User information updated successfully");
  } catch (error) {
    console.error("Error updating user information:", error.message);
    return res.status(500).json({ error: "Failed to update user information" });
  }
});

module.exports =router