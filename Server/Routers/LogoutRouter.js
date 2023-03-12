const AdminAuthenticate = require("../Middlewares/Admin/AdminAuthenticate")
const StudentAuthenticate = require("../Middlewares/StudentLogin/Authenticate")
const LogoutController = require("../Controllers/LogoutController")
const router = require('express').Router()

router.post("/admin", [AdminAuthenticate.AdminAuthenticate], LogoutController.LogoutAdmin)
router.post("/student", [StudentAuthenticate], LogoutController.LogoutStudent)

module.exports = router