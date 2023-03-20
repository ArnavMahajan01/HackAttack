const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const postFilterController = require("../controller/postFilterController");

router.get("/filterDate", auth, postFilterController.filterDate);
router.get("/filterGender", auth, postFilterController.filterGender);
router.get(
  "/filterAvailableSlots",
  auth,
  postFilterController.filterAvailableSlots
);

module.exports = router;
