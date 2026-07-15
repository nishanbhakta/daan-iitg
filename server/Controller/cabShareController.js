const service = require("../Service/cabShareService");

const createCabShare = async (req, res) => {
  try {
    const cabShareData = req.body;
    const newCabShare = await service.createCabShare(cabShareData);
    res.status(201).json(newCabShare);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCabShares = async (req, res) => {
  try {
    const cabShares = await service.getAllCabShares();
    res.status(200).json(cabShares);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCabShareById = async (req, res) => {
  try {
    const { id } = req.params;
    const cabShare = await service.getCabShareById(id);
    if (!cabShare) {
      return res.status(404).json({ error: "Cab share not found" });
    }
    res.status(200).json(cabShare);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCabShare = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCabShare = await service.deleteCabShare(id);
    if (!deletedCabShare) {
      return res.status(404).json({ error: "Cab share not found" });
    }
    res.status(200).json({ message: "Cab share deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCabShare,
  getAllCabShares,
  getCabShareById,
  deleteCabShare,
};
