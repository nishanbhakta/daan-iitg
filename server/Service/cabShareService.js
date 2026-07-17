const repository = require("../repository/cabShareRepository");

const createCabShare = async (cabShareData) => {
  return await repository.createCabShare(cabShareData);
};

const getAllCabShares = async () => {
  return await repository.getAllCabShares();
};

const getCabShareById = async (id) => {
  return await repository.getCabShareById(id);
};

const deleteCabShare = async (id) => {
  return await repository.deleteCabShare(id);
};

module.exports = {
  createCabShare,
  getAllCabShares,
  getCabShareById,
  deleteCabShare,
};
