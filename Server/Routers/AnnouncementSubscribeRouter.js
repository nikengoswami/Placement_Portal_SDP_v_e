const router = require('express').Router()
const AnnouncementSubscribeController = require("../Controllers/AnnouncementSubscribeController")
const StudentAuthenticate = require("../Middlewares/StudentLogin/Authenticate")
const AdminAuthenticate = require("../Middlewares/Admin/AdminAuthenticate")

router.post("/subscribe/:announcementId", [StudentAuthenticate], AnnouncementSubscribeController.addStudentToAnnouncement)
router.post("/unsubscribe/:announcementId", [StudentAuthenticate], AnnouncementSubscribeController.removeStudentToAnnouncement)
router.get("/getSubscribedAnnouncements", [StudentAuthenticate], AnnouncementSubscribeController.getSubscribedAnnouncements)
router.get("/getSubscribedStatus/:announcementId", [StudentAuthenticate], AnnouncementSubscribeController.getSubscribedStatus)
router.get("/downloadSubscribedStudentZip/:announcementId", [AdminAuthenticate.AdminAuthenticate], AnnouncementSubscribeController.downloadSubscribedStudentZip)
router.get("/getSubscribedStudentsOfAnnouncement/:announcementId", [AdminAuthenticate.AdminAuthenticate], AnnouncementSubscribeController.getSubscribedStudentsOfAnnouncement)

module.exports = router