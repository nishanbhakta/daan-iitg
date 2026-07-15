const mongoose = require("mongoose");

const CabShareSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    from: {
      type: String,
      required: [true, "Starting location is required"],
      trim: true,
    },

    to: {
      type: String,
      required: [true, "Destination is required"],
      trim: true,
    },

    travelDate: {
      type: Date,
      required: [true, "Travel date is required"],
    },

    travelTime: {
      type: String,
      required: [true, "Travel time is required"],
    },

    contact: {
      type: String,
      required: [true, "Contact is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("CabShare", CabShareSchema);
