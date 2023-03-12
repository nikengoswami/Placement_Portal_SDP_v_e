const SkillsAndAchievmentsController = require("../Controllers/SkillsAndAchievmentsController")
const router = require('express').Router()
const EmptyFieldCheck = require("../Middlewares/General/EmptyFieldCheck")
const StudentAuthenticate = require("../Middlewares/StudentLogin/Authenticate")

router.post("/addSkillsAndAchievements", [StudentAuthenticate], SkillsAndAchievmentsController.createSkillsAndAchievements)
router.get("/getAllSkillsAndAchievements", SkillsAndAchievmentsController.getAllSkillsAndAchievements)
router.get("/getSkillsAndAchievements/", [StudentAuthenticate], SkillsAndAchievmentsController.getSkillsAndAchievements)
router.get("/getSkillsAndAchievementsInAdmin/:id", SkillsAndAchievmentsController.getSkillsAndAchievementsInAdmin)

router.post("/updateSkillsAndAchievements/", [StudentAuthenticate], SkillsAndAchievmentsController.updateSkillsAndAchievements)
router.post("/deleteSkillsAndAchievements/:id", SkillsAndAchievmentsController.deleteSkillsAndAchievements)

module.exports = router