const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const adminController = require("../controllers/adminController");
const apiController = require("../controllers/apiController");

// WEB ROUTES
router.use("/", (req, res, next) => {
    //console.log(req.session.user);
    next();
})
router.get("/", homeController.index);
router.get("/experience/:id", homeController.experiencePage);
router.get("/connexion", adminController.connectionPage);
router.post("/connect", adminController.connect);
router.get("/admin", adminController.adminPage);
router.get("/addChapter/:id", adminController.addChapterPage);
router.post("/createChapter", adminController.createChapter);
router.put("/moveChapter", adminController.moveChapter);
router.get("/modifyChapter/:id", adminController.modifyChapterPage);
router.put("/changeChapter", adminController.changeChapter);
router.delete("/deleteChapter/:id", adminController.deleteChapter);
router.get("/chapter/:id", homeController.chapterPage);

//API
router.get("/api/allExperiences", apiController.allExperiences);
router.get("/api/experience/:id", apiController.experience);
router.get("/api/getAdmin", apiController.getAllChaptersAndExperiences);
router.get("/api/chapter/:id", apiController.getChapter);

module.exports = router;