const Joi = require("joi");

const createRideSchema = Joi.object({
  name: Joi.string().trim().required(),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),

  arrivalSource: Joi.string()
    .valid(
      "Airport",
      "Guwahati Railway Station",
      "Kamakhya Railway Station",
      "ISBT"
    )
    .required(),

  arrivalDate: Joi.date().required(),

  arrivalTime: Joi.string().required(),

  hostel: Joi.string().required(),

  seatsAvailable: Joi.number()
    .integer()
    .min(1)
    .max(6)
    .required(),

  remarks: Joi.string().allow("").optional(),
});

module.exports = {
  createRideSchema,
};