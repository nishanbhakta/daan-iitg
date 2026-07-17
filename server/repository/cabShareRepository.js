const CabShare = require("../models/CabShareModel");

const createCabShare = async (cabShareData) => {
  const cabShare = new CabShare(cabShareData);
  return await cabShare.save();
};

const getAllCabShares = async () => {
  const now = new Date();

  const plans = await CabShare.find();

  for (const plan of plans) {
    if (!plan.travelDate) continue;

    const expiryTime = new Date(plan.travelDate);
    if (plan.travelTime) {
      const [hours, minutes] = plan.travelTime.split(":").map(Number);

      expiryTime.setHours(hours);
      expiryTime.setMinutes(minutes);
      expiryTime.setSeconds(0);
      expiryTime.setMilliseconds(0);
    }

    // Delete 1 hour after the scheduled travel time
    expiryTime.setHours(expiryTime.getHours() + 1);

    if (expiryTime <= now) {
      await CabShare.findByIdAndDelete(plan._id);
    }
  }

  return await CabShare.find().sort({
    travelDate: 1,
    travelTime: 1,
  });
};

const getCabShareById = async (id) => {
  return await CabShare.findById(id);
};

const deleteCabShare = async (id) => {
  return await CabShare.findByIdAndDelete(id);
};

module.exports = {
  createCabShare,
  getAllCabShares,
  getCabShareById,
  deleteCabShare,
};
