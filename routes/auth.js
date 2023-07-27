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

router.post("/login",async (req,res) =>{
    
    // validate user login
    const{error} = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // if email exists
    const user = await User.findOne({email:req.body.email},)
    if (!user) return res.status(400).send(' Invalid email')

    // check the password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    // if(validPass) return res.status(400).send('login successful')
    if(!validPass) return res.status(400).send('Invalid password')


    // Define the payload with the necessary data
    const payload = {
        userId: user._id, // Use the actual user ID from the user object
        email: user.email, // Use the actual email from the user object
      };

    // create user token
    const secretOrPrivateKey = 'du3782sn7y4r6rtsduehd7';
    const token = jwt.sign(payload, secretOrPrivateKey);
    console.log('Generated Token:', token); // Add this line to log the generated token

     // Save the token in the user document in the database
  try {
    await User.findByIdAndUpdate(user._id, { authToken: token }); // Assuming you have a field named "authToken" in the user schema
    res.header('auth-token', token).send(token);
  } catch (err) {
    res.status(500).send('Error saving token to the database');
  }
    
})


// Delete user account
router.delete("/delete/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    // Perform any additional checks if needed (e.g., check if the user has the necessary permissions to delete the account)

    // Delete the user from the database
    await User.findByIdAndDelete(userId);

    res.status(200).send("Account deleted successfully");
  } catch (err) {
    res.status(500).send({ status: 'failed', msg: err });
  }
});

// Update user information
router.patch("/update/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, firstname, secondname } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    // Validate the new username, firstname, and secondname if provided
    if (username) {
      const usernameValidation = /^[a-zA-Z0-9_]{4,255}$/;
      if (!usernameValidation.test(username)) {
        return res.status(400).send("Invalid username format. Username must be 4 to 255 characters long and can only contain letters, numbers, and underscores.");
      }

      // Check if the new username is already taken by another user
      const usernameExist = await User.findOne({ username });
      if (usernameExist && usernameExist._id.toString() !== userId) {
        return res.status(400).send('Username already taken');
      }

      user.username = username;
    }

    if (firstname) {
      if (firstname.length < 3 || firstname.length > 255) {
        return res.status(400).send("Firstname must be 6 to 255 characters long.");
      }
      user.firstname = firstname;
    }

    if (secondname) {
      if (secondname.length < 3 || secondname.length > 255) {
        return res.status(400).send("Secondname must be 6 to 255 characters long.");
      }
      user.secondname = secondname;
    }

    // Save the updated user information to the database
    await user.save();

    res.status(200).send("User information updated successfully");
  } catch (err) {
    res.status(500).send({ status: 'failed', msg: err });
  }
});

module.exports =router