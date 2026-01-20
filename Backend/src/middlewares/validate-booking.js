const { StatusCodes } = require('http-status-codes');

function validateBooking(req, res, next) {
  const { customerName, serviceType } = req.body;

  if (!customerName || !serviceType) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'customerName and serviceType are required'
    });
  }

  next();
};

module.exports = { 
  validateBooking
};
