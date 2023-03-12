const logger = require("serverloggerjs/logger")
const multer = require('multer');
const path = require('path');
const log = new logger(true)
const db = require("../Models/index")
const StudentAchievementsInternships = db.student_achievements_internships

async function checkExists(id) {
    const studentinternships = await StudentAchievementsInternships.findAll({ 
        where: { id } 
    })
    return studentinternships.length > 0 ? true : false
}

const createStudentAchievementsInternships = async (internshipsData) => {
    try
    {
        const internship = await StudentAchievementsInternships.create(internshipsData)

        if(internship)
        {
            return true
        }
        else {
            throw "error in creating student achievements internships"
        }
    }
    catch(error)
    {
        log.error(error.toString())
        return false
    }
}

const updateStudentAchievementsInternships = async(data, id) => {

    try 
    {
        const status = await checkExists(id)
        if(!status) {
            throw "Student Internship record doesn't exist!"
        }
        else {
            let studentinternship = await StudentAchievementsInternships.update(data, { where: { id } })
            return true
        }
    }
    catch (error) {
        log.error(error.toString())
        return false
    }

}

const getAllStudentsAchievementsInternships = async () => {
    try {
        let studentinternships = await StudentAchievementsInternships.findAll({})
        return studentinternships
    }
    catch (error) {
        log.error(error.toString())
        return false
    }
}

const getStudentAchievementsInternshipsByStudentID = async (id) => {

    try
    {
        let studentinternship = await StudentAchievementsInternships.findAll({
            where: { Student_ID: id }
        })
        // studentinternship = JSON.parse(JSON.stringify(studentinternship))
        return studentinternship
    }
    catch (error) {
        log.error(error.toString())
        return false
    }
}

const deleteStudentAchievementsInternships = async (id) => {

    try
    {
        const status = await checkExists(id)
        if(!status) {
            throw "Student Internship doesn't exist!"
        }
        else {
            await StudentAchievementsInternships.destroy({ where: { id } })
            return true
        }
    }
    catch (error) {
        log.error(error.toString())
        return false
    }
}

const deleteAllAchievementInternshipsOfStudent = async (id) => {
    try {
        const temp = await StudentAchievementsInternships.findAll({ where: { Student_ID: id } })
        const status = temp.length > 0 ? true : false
        if(status)
        {
            await StudentAchievementsInternships.destroy({ where: { Student_ID: id } })
            return true
        }
        else
        {
            throw "Internship (that student added) record doesn't exist for the particular Student_ID"
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

module.exports = {
    createStudentAchievementsInternships,
    updateStudentAchievementsInternships,
    getAllStudentsAchievementsInternships,
    getStudentAchievementsInternshipsByStudentID,
    deleteStudentAchievementsInternships,
    deleteAllAchievementInternshipsOfStudent
}