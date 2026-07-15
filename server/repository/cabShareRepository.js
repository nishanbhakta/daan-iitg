const CabShare = require("../models/CabShareModel");

const createCabShare = async (cabShareData) => {
  const cabShare = new CabShare(cabShareData);
  return await cabShare.save();
};

const getAllCabShares = async () => {
  return await CabShare.find();
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
