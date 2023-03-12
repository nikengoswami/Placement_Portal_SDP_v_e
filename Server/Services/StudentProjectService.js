const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const StudentProject = db.student_projects
// const StudentService = require("./StudentService")

async function checkExists(id) {
    const studentproject = await StudentProject.findAll({ where: {Project_ID: id }})
    return studentproject.length > 0 ? true : false
}

const createStudentProject = async (studentprojectdata) => {
    try {
        const studentproject = await StudentProject.create(studentprojectdata)
    } catch (error) {
        log.error(error.toString())
        return false
    }
    return true
}

const getAllStudentProjects = async () => {
    try {
        let studentprojects = await StudentProject.findAll({})
        return studentprojects
    } catch (error) {
        log.error(err.toString())
        return false
    }
}

const getOneStudentProject = async (id) => {
    try {
        let studentproject = await StudentProject.findAll({
            where: { Student_ID: id }
        })
        return studentproject
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const updateStudentProject = async (data, id) => {
    try {
        if(await checkExists(id)) {
            const studentproject = await StudentProject.update(data, {where: { Project_ID: id} })
            return studentproject
        }
        else { 
            return false
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const deleteStudentProject = async (id) => {
    try {
        const status = await checkExists(id)
        if(!status)
        {
            throw "Error deleting student project"
        }
        else
        {
            await StudentProject.destroy({ where: { Project_ID: id } })
            return true
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const deleteAllProjectOfStudent = async (id) => {
    try {
        const temp = await StudentProject.findAll({ where: { Student_ID: id } })
        const status = temp.length > 0 ? true : false
        if(status)
        {
            await StudentProject.destroy({ where: { Student_ID: id } })
            return true
        }
        else
        {
            throw "Project record doesn't exist for the particular Student_ID"
        }

    } catch (error) {
        log.error(error.toString())
        return false
    }
}

module.exports = {
    createStudentProject, 
    getAllStudentProjects,
    getOneStudentProject,
    updateStudentProject,
    deleteStudentProject,
    deleteAllProjectOfStudent
}