const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const apiController = require("../controllers/apiController");

// WEB ROUTES
router.get("/", homeController.index);
router.get("/allExperiences", homeController.allExperiences)
//API
router.get("/api/allExperiences", apiController.allExperiences);

module.exports = router;