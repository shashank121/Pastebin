const express = require("express");
const router = express.Router();
const {
  homePage,
  createPaste,
  getPaste
} = require("../controllers/pasteController");

router.get("/", homePage);
router.post("/create", createPaste);
router.get("/paste/:id", getPaste);

module.exports = router;
