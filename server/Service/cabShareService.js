const repositorie = require("../repository/cabShareRepository");

const createCabShare = async (cabShareData) => {
  return await repositorie.createCabShare(cabShareData);
};

const getAllCabShares = async () => {
  return await repositorie.getAllCabShares();
};

const getCabShareById = async (id) => {
  return await repositorie.getCabShareById(id);
};

const deleteCabShare = async (id) => {
  return await repositorie.deleteCabShare(id);
};

module.exports = {
  createCabShare,
  getAllCabShares,
  getCabShareById,
  deleteCabShare,
};
