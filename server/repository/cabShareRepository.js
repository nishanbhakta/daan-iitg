const CabShare = require("../models/CabShareModel");

const createCabShare = async (cabShareData) => {
  console.log("Incoming:", cabShareData);

  const cabShare = new CabShare(cabShareData);

  const saved = await cabShare.save();

  console.log("Saved:", saved);

  return saved;
};
const getAllCabShares = async () => {
  // Delete rides 1 hour after departure
  await CabShare.deleteMany({
    travelDateTime: {
      $lt: new Date(Date.now() - 60 * 60 * 1000),
    },
  });

  return await CabShare.find().sort({
    travelDateTime: 1,
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
