const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per minute
});

const rateLimiter = (req, res, next) => {
  apiLimiter(req, res, next);
};

module.exports = rateLimiter;