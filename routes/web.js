const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const adminController = require("../controllers/adminController");
const apiController = require("../controllers/apiController");

// WEB ROUTES
router.get("/", homeController.index);
router.get("/experience/:id", homeController.experiencePage);
router.get("/connexion", adminController.connectionPage);
router.post("/connect", adminController.connect);

//API
router.get("/api/allExperiences", apiController.allExperiences);
router.get("/api/experience/:id", apiController.experience);

module.exports = router;