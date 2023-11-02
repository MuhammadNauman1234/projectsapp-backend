const User = require("../models/usersModel");

const verifyTokenMiddleware = async (req, res, next) => {
  try {
    // Get the Authorization header from the request
    const authorizationHeader = req.headers["authorization"];

    // Check if the header exists
    if (!authorizationHeader) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Token not provided" });
    }

    // Split the header value to get the token part
    const [token] = authorizationHeader.split(" ");

    console.log(token);

    // Check if the header has the expected format
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded.id);

    // const userId = decoded.userId;

    // Retrieve the user from the database using the user ID
    const user = await User.findOne({ userId });
    req.user = user;
    req.userId = user._id;
    // Continue to the next middleware or route handler
    next();
  } catch (error) {}
};

module.exports = verifyTokenMiddleware;
