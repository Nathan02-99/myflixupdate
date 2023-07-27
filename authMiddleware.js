const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization'); // Retrieve the token from the Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token and decode the payload
    const decodedToken = jwt.verify(token, 'your-secret-key');

    // Attach the decoded payload to the request object for further use in routes
    req.user = decodedToken;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};
