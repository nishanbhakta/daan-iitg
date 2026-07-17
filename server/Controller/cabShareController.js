const service = require("../Service/cabShareService");

const createCabShare = async (req, res) => {
  try {
    const cabShare = await service.createCabShare(req.body);
    return res.status(201).json(cabShare);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCabShares = async (req, res) => {
  try {
    const cabShares = await service.getAllCabShares();
    return res.status(200).json(cabShares);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCabShareById = async (req, res) => {
  try {
    const cabShare = await service.getCabShareById(req.params.id);

    if (!cabShare) {
      return res.status(404).json({
        success: false,
        message: "Cab share not found",
      });
    }

    return res.status(200).json(cabShare);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCabShare = async (req, res) => {
  try {
    const cabShare = await service.deleteCabShare(req.params.id);

    if (!cabShare) {
      return res.status(404).json({
        success: false,
        message: "Cab share not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCabShare,
  getAllCabShares,
  getCabShareById,
  deleteCabShare,
};
