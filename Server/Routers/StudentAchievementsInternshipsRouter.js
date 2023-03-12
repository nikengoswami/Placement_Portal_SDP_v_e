const router = require('express').Router()
const multer = require('multer');
const StudentAchievementsInternshipsController = require("../Controllers/StudentAchievementsInternshipsController")
const StudentAuthenticate = require("../Middlewares/StudentLogin/Authenticate")

router.post("/createStudentAchievementsInternships/", [StudentAuthenticate], StudentAchievementsInternshipsController.createStudentAchievementsInternships)

router.post("/updateStudentAchievementsInternships/:id", [StudentAuthenticate], StudentAchievementsInternshipsController.updateStudentAchievementsInternships)

router.get("/getAllStudentAchievementsInternships", [StudentAuthenticate], StudentAchievementsInternshipsController.getAllStudentAchievementsInternships)

router.get("/getStudentAchievementsInternshipsByStudentID", [StudentAuthenticate], StudentAchievementsInternshipsController.getStudentAchievementsInternshipsByStudentID)

router.get("/getStudentAchievementsInternshipsByStudentIDInAdmin/:id", StudentAchievementsInternshipsController.getStudentAchievementsInternshipsByStudentIDInAdmin)

router.post("/deleteStudentAchievementsInternships/:id", [StudentAuthenticate], StudentAchievementsInternshipsController.deleteStudentAchievementsInternships)

module.exports = router