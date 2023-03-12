const db = require("../Models")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const StudentProjectService = require("../Services/StudentProjectService")
const StudentProject = db.student_projects

async function checkExists(id) {
    const studentproject = await StudentProject.findAll({ where: {id} })
    return studentproject.length > 0 ? true : false
}

const createStudentProject = async (req, res) => {
    try {
        req.body.Student_ID = req.userId
        const data = req.body
        // data.Student_ID = req.userId
        const studentprojectStatus = await StudentProjectService.createStudentProject(data)
        if(studentprojectStatus) 
        {
            return res.json({ data: "StudentProject record created", status: true })
        }
        else
        {
            throw "Error from createStudentProject controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ status: false, data: "Error creating student project!!!" })
    }
}

const getAllStudentProjects = async (req, res) => {
    try {
        let studentprojects = await StudentProjectService.getAllStudentProjects()
        if(studentprojects)
        {
            return res.json({ status: studentprojects.length == 0 ? false : true, data: studentprojects.length == 0 ? "No student project record found" : studentprojects })
        }
        else
        {
            throw "Error from getAllStudentProject controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ status: false, data: "Error from getAllStudentProject controller" })
    }
}

const getOneStudentProject = async (req, res) => {
    try {
        // const id = req.params.id
        const id = req.userId
        let studentproject = await StudentProjectService.getOneStudentProject(id)
        if(studentproject)
        {
            return res.json({status: studentproject.length == 0 ? false : true, data: studentproject.length == 0 ? "Student project record not found" : studentproject })
        }
        else
        {
            throw "Error from getOneStudentProject controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ status: false, data: "Error from getOneStudentProject controller" })
    }
}

const getOneStudentProjectInAdmin = async (req, res) => {
    try {
        const id = req.params.id
        // const id = req.userId
        let studentproject = await StudentProjectService.getOneStudentProject(id)
        if(studentproject)
        {
            return res.json({status: studentproject.length == 0 ? false : true, data: studentproject.length == 0 ? "Student project record not found" : studentproject })
        }
        else
        {
            throw "Error from getOneStudentProject controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ status: false, data: "Error from getOneStudentProject controller" })
    }
}

const updateStudentProject = async (req, res) => {
    try {
        const id = req.params.id
        const studentproject = await StudentProjectService.updateStudentProject(req.body, id)
        if(studentproject) 
        {
            return res.json({ status: true, data: "Student project record updated" })
        }
        else{
            throw "Error from updateStudentProject controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ status: false, data: "Error from updateStudentProject controller" })
    }
}

const deleteStudentProject = async (req, res) => {
    try {
        const id = req.params.id
        const studentproject = await StudentProjectService.deleteStudentProject(id)
        if(studentproject)
        {
            return res.json({ status: true, data: "Student project record deleted successfully" })
        }
        else
        {
            throw "Error from deleteStudentProject controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ status: false, data: "Error from deleteStudentProject controller" })
    }
}

module.exports = {
    createStudentProject,
    getAllStudentProjects,
    getOneStudentProject,
    updateStudentProject,
    deleteStudentProject,
    getOneStudentProjectInAdmin
}