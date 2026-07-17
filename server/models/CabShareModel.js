const mongoose = require("mongoose");

const CabShareSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    from: {
      type: String,
      required: true,
      trim: true,
    },

    to: {
      type: String,
      required: true,
      trim: true,
    },

    travelDateTime: {
      type: Date,
      required: true,
    },

    groupSize: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
      max: 4,
    },

    contact: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("CabShare", CabShareSchema);
