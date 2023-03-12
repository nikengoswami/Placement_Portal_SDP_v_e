const StudentProjectController = require("../Controllers/StudentProjectController")
const router = require('express').Router()
const StudentAuthenticate = require("../Middlewares/StudentLogin/Authenticate")

router.post("/createStudentProject", [StudentAuthenticate],StudentProjectController.createStudentProject)

router.get("/getAllStudentProject", StudentProjectController.getAllStudentProjects)

router.get("/getOneStudentProject/", [StudentAuthenticate],StudentProjectController.getOneStudentProject)

router.get("/getOneStudentProjectInAdmin/:id",StudentProjectController.getOneStudentProjectInAdmin)

router.post("/updateStudentProject/:id", StudentProjectController.updateStudentProject)

router.post("/deleteStudentProject/:id", [StudentAuthenticate],StudentProjectController.deleteStudentProject)

module.exports = router