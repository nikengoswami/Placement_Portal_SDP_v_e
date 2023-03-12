const CompanyController = require('../Controllers/CompanyController.js')
const EmptyFieldCheck = require('../Middlewares/Company/EmptyFieldCheck.js')
const router = require('express').Router()
const AdminAuthenticate = require("../Middlewares/Admin/AdminAuthenticate")

router.post("/addCompany", [AdminAuthenticate.AdminAuthenticate], CompanyController.addCompany)
router.get("/getCompany/:id", [AdminAuthenticate.AdminAuthenticate], CompanyController.getCompany)
router.get("/getCompany", [AdminAuthenticate.AdminAuthenticate], CompanyController.getAllCompany)
router.post("/updateCompany/:id", [AdminAuthenticate.AdminAuthenticate], CompanyController.updateCompany)
router.post("/deleteCompany/:id", [AdminAuthenticate.AdminAuthenticate], CompanyController.deleteCompany)


module.exports = router