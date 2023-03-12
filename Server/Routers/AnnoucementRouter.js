// import controllers review, products
const multer = require('multer');
const AnnouncementController = require('../Controllers/AnnoucementController.js')
const router = require('express').Router()
// const EmptyFieldCheck = require('../Middlewares/General/EmptyFieldCheck')
const EmptyFieldCheck = require("../Middlewares/Annoucement/EmptyFieldCheck");
const SalaryVerifier = require("../Middlewares/Annoucement/SalaryVerifier");
const DateValidator = require("../Middlewares/Annoucement/DateValidator");
const StudentAuthenticate = require("../Middlewares/StudentLogin/Authenticate")
const AdminAuthenticate = require("../Middlewares/Admin/AdminAuthenticate")
const ResolveUsers = require("../Middlewares/General/ResloveUser")
const fileUpload = require("../Middlewares/FileUpload/FileUpload")


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public")
    },
    filename: (req, file, cb) => {
        const dat = Date.now()
        // console.log(typeof req.body.Date_of_Visit)'
        const extension = file.originalname.split(".")[1]
        console.log(req.body)
        cb(null, req.body.Company_ID + "-" + dat.toString() + "." + extension)
        console.log(req.body);
        req.fileName = "/" + req.body.Company_ID + "-" + dat.toString() + "." + extension
    }

})

const upload = multer({ storage: fileStorage })

router.post("/addAnnoucement", [AdminAuthenticate.AdminAuthenticate, upload.single("Job_Description_File")], AnnouncementController.addAnnoucement)

router.post("/deleteAnnoucement/:annoucementId", [AdminAuthenticate.AdminAuthenticate], AnnouncementController.deleteAnnoucement)

router.get("/getAllAnnoucements", [ResolveUsers.ResolveUserMiddleware], AnnouncementController.getAllAnnoucements)

router.get("/getAnnoucement/:annoucementId", [ResolveUsers.ResolveUserMiddleware], AnnouncementController.getAnnoucement)

router.post("/updateAnnoucement/:annoucementId", [AdminAuthenticate.AdminAuthenticate, upload.single("Job_Description_File")], AnnouncementController.updateAnnoucement)

router.get("/requiredAnnoucementDetails", [AdminAuthenticate.AdminAuthenticate], AnnouncementController.requiredAnnoucementDetails)

// related to comments
router.post("/addComment/:annoucementId", [ResolveUsers.ResolveUserMiddleware], AnnouncementController.addComment)

router.get("/getAllComments/:annoucementId", AnnouncementController.getAllComments)


module.exports = router