const db = require("../Models")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const StudentInternship = db.student_internships
const StudentInternshipService = require("../Services/StudentInternshipService")
const CSVToJSON = require('csvtojson')
const ResponseService = require("../Services/ResponseService")
const ERROR = ResponseService.ERROR
const OK = ResponseService.OK

async function checkExists(id) {
    const studnentinternship = await StudentInternship.findAll({ where: { id } })
    return studnentinternship.length > 0 ? true : false
}

const addStudentInternship = async (req, res) => {
    try {
        const data = req.body
        if (req.emptyField) {
            throw req.empty_arr[0] + " cannot be empty"
        }
        const status = await StudentInternshipService.createStudentInternship(data)
        if (status) {
            return res.json({ data: "Student Internship Record created", status: true })
        }
        else {
            throw "Error from createStudentInternship controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false })
    }
}

const addStudentInternshipViaCSV = async (req, res) => {
    try {
        const path = "./public/InternshipFiles/DDU_INTERNSHIP.csv"
        const studentInternshipData = await CSVToJSON().fromFile(path)
        if (studentInternshipData) {
            for (let i = 0; i < studentInternshipData.length; i++) {
                try {
                    let studentStatus = await StudentInternshipService.createStudentInternship(studentInternshipData[i], true)

                    if (studentStatus == "OK") {
                        continue;
                    }
                    else {
                        return ERROR(res, studentStatus)
                    }
                    // if (studentStatus == "Empty") {
                    //     return ERROR(res, studentStatus)
                    // }
                    // else if (studentStatus == "No student found") {
                    //     return ERROR(res, "No student with ID: " + studentInternshipData[i]["Student_ID"])
                    // }

                } catch (error) {
                    log.error(error.toString())
                    throw "Error adding student internship data via csv"
                }
            }
        }
        return OK(res, "Student internship data added")
        return res.json({ status: true, data: "Student internship data added" })
    } catch (error) {
        log.error(error.toString())
        return res.json({ data: "Error adding student internship data", status: false })
    }
}

const getAllStudentInternship = async (req, res) => {
    try {
        let studentinternships = await StudentInternshipService.getAllStudentInternship()
        if (studentinternships) {
            return res.json({ status: studentinternships.length == 0 ? false : true, data: studentinternships.length == 0 ? "No Student Internship Record found" : studentinternships })
        }
        else {
            throw "Error from getAllStudentInternship controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false })
    }
}

const getStudentInternship = async (req, res) => {
    try {
        const id = req.params.id
        let studentinternship = await StudentInternshipService.getStudentInternship(id)
        if (studentinternship) {
            return res.json({ status: studentinternship.length == 0 ? false : true, data: studentinternship.length == 0 ? "Student Internship Record Not Found!" : studentinternship })
        }
        else {
            throw "Error from getStudentInternship controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false })
    }
}

const getStudentInternshipInStudent = async (req, res) => {
    try {
        const student_id = req.userId
        let studentinternship = await StudentInternshipService.getStudentInternship(student_id)
        if (studentinternship) {
            return res.json({ status: studentinternship.length == 0 ? false : true, data: studentinternship.length == 0 ? "Student Internship Record Not Found!" : studentinternship })
        }
        else {
            throw "Error! While fetching internships"
        }
    }
    catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false })
    }
}

const updateStudentInternship = async (req, res) => {
    try {
        console.log(req.body)
        const id = req.params.id
        const studentinternship = await StudentInternshipService.updateStudentInternship(req.body, id)
        if (studentinternship) {
            return res.json({ status: true, data: "Student Internship Record Updated" })
        }
        else {
            throw "Error from updateStudentInternship controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false })
    }
}

const deleteStudentInternship = async (req, res) => {
    try {
        const id = req.params.id
        const status = await StudentInternshipService.deleteStudentInternship(id)
        if (status) {
            return res.json({ status: true, data: "Student Internship Record Deleted Successfully!!" })
        }
        else {
            throw "Error from deleteStudentInternship controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false })
    }
}

const deleteAllInternshipOfStudent = async (req, res) => {
    try {
        const id = req.params.id
        const status = await StudentInternshipService.deleteAllInternshipOfStudent(id)
        // console.log("line 124 :", status)
        if (status) {
            return ResponseService.OK(res, "Student internship record deleted successfully")
        }
        else {
            throw "Error deleting all internship of a student"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ status: false, data: error.toString() })
    }
}

module.exports = {
    addStudentInternship,
    getAllStudentInternship,
    getStudentInternship,
    updateStudentInternship,
    deleteStudentInternship,
    addStudentInternshipViaCSV,
    deleteAllInternshipOfStudent,
    getStudentInternshipInStudent
}