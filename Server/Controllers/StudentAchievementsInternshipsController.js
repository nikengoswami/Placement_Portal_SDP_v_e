const db = require("../Models")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const StudentAchievementsInternships = db.student_achievements_internships
const StudentAchievementsInternshipsService = require("../Services/StudentAchievementsInternshipsServices")

const createStudentAchievementsInternships = async (req, res) => {

    try {
        req.body.Student_ID = req.userId
        const data = req.body;
        
        const status = await StudentAchievementsInternshipsService.createStudentAchievementsInternships(data);

        if(status)
        {
            return res.json({ data: "Student Internships created", status: true})
        }
        else{
            throw "Error ocurred while adding internships!"
        }
    }
    catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false})
    }
}

const updateStudentAchievementsInternships = async (req, res) => {

    try 
    {
        const id = req.params.id
        const studentinternship = await StudentAchievementsInternshipsService.updateStudentAchievementsInternships(req.body, id)
        if(studentinternship) {
            return res.json({ status: true, data: "Student Internship Updated!" })
        }
        else {
            throw "Error ocurred while updating internships!"
        }
    }
    catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false})
    }
}

const getAllStudentAchievementsInternships = async (req, res) => {
    try{
        let studentinternships = await StudentAchievementsInternshipsService.getAllStudentsAchievementsInternships()
        if(studentinternships) {
            return res.json({ status: studentinternships.length == 0 ? false : true, data: studentinternships.length == 0 ? "No Student Internship found" : studentinternships })
        }
        else {
            throw "Error ocurred while getting all internships!"
        }
    }
    catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false})
    }
}

const getStudentAchievementsInternshipsByStudentID = async (req, res) => {

    try
    {
        const student_id = req.userId
        // const student_id = "19CEUEG018"
        let studentinternship = await StudentAchievementsInternshipsService.getStudentAchievementsInternshipsByStudentID(student_id)
        if(studentinternship) {
            return res.json({ status: studentinternship.length == 0 ? false : true, data: studentinternship.length == 0 ? "Student Internship Record Not Found!" : studentinternship })   
        }
        else {
            throw "Error ocurred while getting all internships by student id!"
        }
    }
    catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false})
    }
}

const getStudentAchievementsInternshipsByStudentIDInAdmin = async (req, res) => {

    try
    {
        const student_id = req.params.id
        let studentinternship = await StudentAchievementsInternshipsService.getStudentAchievementsInternshipsByStudentID(student_id)
        if(studentinternship) {
            return res.json({ status: studentinternship.length == 0 ? false : true, data: studentinternship.length == 0 ? "Student Internship Record Not Found!" : studentinternship })   
        }
        else {
            throw "Error ocurred while getting all internships by student id!"
        }
    }
    catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false})
    }
}

const deleteStudentAchievementsInternships = async (req, res) => {

    try
    {
        const id = req.params.id
        const status = await StudentAchievementsInternshipsService.deleteStudentAchievementsInternships(id)
        if(status) {
            return res.json({ status: true, data: "Student Internship Deleted Successfully!!" })
        }
        else {
            throw "Error ocurred while deleting internship!"
        }
    }
    catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false})
    }
}

module.exports = {
    createStudentAchievementsInternships,
    updateStudentAchievementsInternships,
    getAllStudentAchievementsInternships,
    getStudentAchievementsInternshipsByStudentID,
    deleteStudentAchievementsInternships,
    getStudentAchievementsInternshipsByStudentIDInAdmin
}