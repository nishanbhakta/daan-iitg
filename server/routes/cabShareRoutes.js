const express = require("express");
const router = express.Router();
const controller = require("../Controller/cabShareController");

router.post("/cabshares", controller.createCabShare);
router.get("/cabshares", controller.getAllCabShares);
router.get("/cabshares/:id", controller.getCabShareById);
router.delete("/cabshares/:id", controller.deleteCabShare);

module.exports = router;
