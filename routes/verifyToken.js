const jwt = require("jsonwebtoken");
const User = require("../model/user");

module.exports = async function (req, res, next) {
  // Check for the auth-token header or the query parameter 'authToken'
  const token = req.header("auth-token") || req.query.authToken;

  if (!token) {
    return res.status(401).send("Not signed in");
  }

  try {
    const verified = jwt.verify(token, process.env.secretOrPrivateKey);
    req.user = verified;

    // Fetch the user from the database using the user ID obtained from the authToken
    const user = await User.findById(req.user.userId);

    // If the user is not found in the database, return an error
    if (!user) {
      return res.status(401).send("Not signed in");
    }

    // Set the user ID on the request object
    req.user.userId = user._id;

    next();
  } catch (err) {
    return res.status(400).send("Invalid User");
  }
};


