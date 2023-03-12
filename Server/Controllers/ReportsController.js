const db = require("../Models")
const multer = require('multer');
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const ReportService = require("../Services/ReportService");
const ResponseService = require("../Services/ResponseService")
const OK = ResponseService.OK
const ERROR = ResponseService.ERROR
const RESP = ResponseService.RESP

const getPlacementReportByBatchYear = async (req, res) => {

    try
    {
        let data = req.body
        let batch_year = req.body.Passed_out_year
        console.log(data)
        
        let placements = await ReportService.getPlacementReportByBatchYear(batch_year)
        console.log(placements)
        if(placements)
        {
            return RESP(res, placements.length == 0 ? false : true, placements.length == 0 ? "No placements data!" : placements)
        }
        else {
            throw "Error in getAllPlacements in reports. Status returned false."
        }

    }
    catch (e) {
        log.error(e.toString())
        // console.log(e.toString());
        // return ERROR(res, "Oops! some unknown error occured getting placements!")
        return ERROR(res, "Error! While fetching report for placement!")
        // res.json({ status: false, data: e.toString() })
    }
}

const multiplePlacements = async (req, res) => {
    try
    {
        let data = req.body
        let batch_year = req.body.Passed_out_year

        let placements = await ReportService.multiplePlacements(batch_year)

        if(placements)
        {
            return RESP(res, placements.length == 0 ? false : true, placements.length == 0 ? "No placements data!" : placements)
        }
        else {
            throw "Error in multiplePlacements in reports"
        }

    }
    catch (e) {
        log.error(e.toString())
        // console.log(e.toString());
        // return ERROR(res, "Oops! some unknown error occured getting placements!")
        return ERROR(res, "Error! While fetching report for multiple placement!")
        // res.json({ status: false, data: e.toString() })
    }

}

const placedStudentsByCompany = async (req, res) => {
    try
    {
        let data = req.body
        let batch_year = req.body.Passed_out_year
        
        if(batch_year.toLowerCase() == "all")
        {
            batch_year = "1"
        }
        
        let placements = await ReportService.placedStudentsByCompany(batch_year)

        if(placements)
        {
            return RESP(res, placements.length == 0 ? false : true, placements.length == 0 ? "No placements data!" : placements)
        }
        else {
            throw "Error in multiplePlacements in reports"
        }
    }
    catch (e) {
        log.error(e.toString())
        // console.log(e.toString());
        // return ERROR(res, "Oops! some unknown error occured getting placements!")
        return ERROR(res, "Error! While fetching report for company!")
        // res.json({ status: false, data: e.toString() })
    }
}

const singleCompanyDetails = async (req, res) => {
    try
    {
        let company_id = req.params.id
        let batch_year = req.params.batch_year
        console.log("Company id: ", company_id)
        console.log("Batch yera: ", batch_year)

        if(!company_id || !batch_year)
        {
            throw "Error!! Company Id and Batch year are required!"
        }

        let students = await ReportService.singleCompanyDetails(company_id, batch_year)

        if(students)
        {
            return RESP(res, students.length == 0 ? false : true, students.length == 0 ? "No students data!" : students)
        }
        else {
            throw "Error in report of single company!"
        }
    }
    catch (e) {
        log.error(e.toString())
        // console.log(e.toString());
        // return ERROR(res, "Oops! some unknown error occured getting placements!")
        return ERROR(res, e.toString())
        // res.json({ status: false, data: e.toString() })
    }
}

const studentsInterestedInHigherStudies = async (req, res) => {
    try {
        let Passed_out_year = req.body.Passed_out_year

        let data = await ReportService.studentsInterestedInHigherStudies(Passed_out_year)

        if(data)
        {
            return OK(res, data)
        }
        else {
            throw "Error from studentsInterestedInHigherStudies controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ status: false, data: "Error! While fetching report for higher study!" })
    }
}

const unplacedStudents = async (req, res) => {
    try {
        
        // console.log("in unplaced students controlller")

        let Passed_out_year = req.body.Passed_out_year

        let data = await ReportService.unplacedStudents(Passed_out_year)

        if(data)
        {
            return OK(res, data)
        }
        else
        {
            throw "Error from unplacedStudents controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ status: false, data: "Error! While fecthing report for unplaced students!" })
    }
}

const unplacedInternship = async(req, res) => {
    try {
        
        let Passed_out_year = req.body.Passed_out_year

        let data = await ReportService.unplacedInternship(Passed_out_year)

        if(data)
        {
            return OK(res, data)
        }
        else
        {
            throw "Error from unplacedInternship controller"
        }

    } catch (error) {
        log.error(error.toString())
        return res.json({ status: false, data: "Error! While fecthing report for unplaced students!" })
    }
}

module.exports = {
    getPlacementReportByBatchYear,
    multiplePlacements,
    placedStudentsByCompany,
    singleCompanyDetails,
    studentsInterestedInHigherStudies,
    unplacedStudents,
    unplacedInternship
}