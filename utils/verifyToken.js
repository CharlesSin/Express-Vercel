const jwt = require("jsonwebtoken");

// Verify Token
// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

const verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.replace("Bearer", "");
    // Get token
    const bearerToken = bearer;
    // Set the token
    req.token = bearerToken;

    // Decoded JWT Token
    const userData = jwtDecoded(bearerToken);
    // Set the User name
    req.name = userData.name;
    // Set the User email
    req.email = userData.email;
    // Set the User role
    req.role = userData.role;

    // Next middleware
    next();
  } else {
    // Forbidden
    res.status(403).json({ msg: "Token Invaild" });
  }
};

const jwtDecoded = (jwtToken) => {
  return jwt.verify(jwtToken, "secretkey", (err, decoded) => decoded.userData);
};

module.exports = verifyToken;
