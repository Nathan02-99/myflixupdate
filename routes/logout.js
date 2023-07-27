const User = require('../model/user');

module.exports = async function (req, res, next) {
  const token = req.header('auth-token');

 
  try {
    // Clear the authentication token from the client-side
    res.clearCookie('auth-token');


// Check if the user ID is present in the request
const userId = req.params.userId || req.user.userId;

// If the user ID is not present, return an error
if (!userId) {
  return res.status(401).send("Not signed in");
}
// Remove the authToken from the user document in the database
await User.findByIdAndUpdate(userId, { authToken: null });

    res.status(200).send('Logged out successfully');
  } catch (err) {
    return res.status(500).send('Error removing token from the database');
  }
};

