const User = require('../model/user');

module.exports = async function (req, res, next) {
  const userId = req.body.userId; // Extract user ID from request body
  const authHeader = req.header('Authorization');

  try {
    // If the user ID is not present, return an error
    if (!userId) {
      return res.status(401).send("User ID not provided");
    }

    // If the auth header is not present, return an error
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send("Unauthorized");
    }

    const token = authHeader.substring(7); // Extract token from the "Bearer " prefix

    // Find the user by ID and update the authToken to null
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, authToken: token },
      { authToken: null }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found or unauthorized");
    }

    res.status(200).send('Logged out successfully');
  } catch (err) {
    return res.status(500).send('Error removing token from the database');
  }
};

