const StudentInternshipController = require("../Controllers/StudentInternshipController")
const router = require('express').Router()
const EmptyFieldCheck = require("../Middlewares/General/EmptyFieldCheck")
const multer = require('multer')
const FileUploadMiddleware = require("../Middlewares/FileUpload/FileUpload")
const AdminAuthenticate = require("../Middlewares/Admin/AdminAuthenticate")
const StudentAuthenticate = require("../Middlewares/StudentLogin/Authenticate")

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/InternshipFiles")
    },
    filename: (req, file, cb) => {
        console.log(req.body)
        const extension = file.originalname.split(".")[1]
        if (extension == 'csv' || extension == 'xlsx')
        {
            cb(null, "DDU_INTERNSHIP" + ".csv")
            console.log(req.body)
        }
        
    }
})

const upload = multer({ storage: fileStorage })

router.post("/addStudentInternship", StudentInternshipController.addStudentInternship)
router.post("/addStudentInternshipViaCSV", [AdminAuthenticate.AdminAuthenticate, upload.single("Student_Internship_Details_File")], StudentInternshipController.addStudentInternshipViaCSV)
router.get("/getAllStudentInternship", StudentInternshipController.getAllStudentInternship)
router.get("/getStudentInternship/:id", StudentInternshipController.getStudentInternship)
router.get("/getStudentInternshipInStudent/", [StudentAuthenticate], StudentInternshipController.getStudentInternshipInStudent)



router.post("/updateStudentInternship/:id", StudentInternshipController.updateStudentInternship)
router.post("/deleteStudentInternship/:id", StudentInternshipController.deleteStudentInternship)
router.post("/deleteAllInternshipOfStudent/:id", StudentInternshipController.deleteAllInternshipOfStudent)

module.exports = router