const User = require('../model/user');

module.exports = async function (req, res, next) {
  const token = req.header('auth-token');

  try {
    // If the token is not found, return an error
    if (!token) {
      return res.status(401).send('Invalid token');
    }

    // Find the user by authToken in the database
    const user = await User.findOne({ authToken: token });

    // If user not found or authToken is null, return an error
    if (!user || user.authToken !== token) {
      return res.status(401).send('Invalid token');
    }

    // Clear the authentication token from the client-side
    res.clearCookie('auth-token');

    // Remove the authToken from the user document in the database
    user.authToken = null;
    await user.save();

    res.status(200).send('Logged out successfully');
  } catch (err) {
    return res.status(500).send('Error removing token from the database');
  }
};

