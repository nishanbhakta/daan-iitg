const {
  createRideSchema,
} = require("../validators/cabShareValidator");

exports.createRide = async (req, res, next) => {
  try {
    const { error } = createRideSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const ride = await cabShareService.createRide(req.body);

    res.status(201).json({
      success: true,
      data: ride,
    });
  } catch (err) {
    next(err);
  }
};