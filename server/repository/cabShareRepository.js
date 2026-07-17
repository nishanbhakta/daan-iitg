const CabShare = require("../models/CabShareModel");

const createCabShare = async (cabShareData) => {
  const cabShare = new CabShare(cabShareData);
  return await cabShare.save();
};

const getAllCabShares = async () => {
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
