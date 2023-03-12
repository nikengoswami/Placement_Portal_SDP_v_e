const router = require('express').Router()
const NotificationController = require("../Controllers/NotificationController")
const StudentAuthenticate = require("../Middlewares/StudentLogin/Authenticate")

router.post("/getUserNotifications", [StudentAuthenticate], NotificationController.getUserNotifications)

module.exports = router
