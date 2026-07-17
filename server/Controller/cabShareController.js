const service = require("../Service/cabShareService");

const createCabShare = async (req, res) => {
  try {
    const cabShareData = req.body;

    const newCabShare = await service.createCabShare(cabShareData);

    return res.status(201).json(newCabShare);
  } catch (error) {
    console.error("CREATE CAB SHARE ERROR");
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
    console.error("GET ALL CAB SHARES ERROR");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCabShareById = async (req, res) => {
  try {
    const { id } = req.params;

    const cabShare = await service.getCabShareById(id);

    if (!cabShare) {
      return res.status(404).json({
        success: false,
        message: "Cab share not found",
      });
    }

    return res.status(200).json(cabShare);
  } catch (error) {
    console.error("GET CAB SHARE ERROR");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCabShare = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCabShare = await service.deleteCabShare(id);

    if (!deletedCabShare) {
      return res.status(404).json({
        success: false,
        message: "Cab share not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cab share deleted successfully",
    });
  } catch (error) {
    console.error("DELETE CAB SHARE ERROR");
    console.error(error);

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
