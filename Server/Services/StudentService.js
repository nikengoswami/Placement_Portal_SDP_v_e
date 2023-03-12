const UserLoginService = require("./UserLoginService")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const Student = db.students
const FirstTimePasswordService = require("./FirstTimePasswordService")
const SkillsAndAchievementsService = require("./SkillsAndAchievementsService")
// const UserLogin = db.userLogin
const StudentProject = db.student_projects
const StudentPlacement = db.student_placements
const StudentInternship = db.student_internships
const StudentAchievementsInternships = db.student_achievements_internships
// const SkillsAndAchievements = db.skills_and_achievements
const Notifications = db.notifications
const LoginTokens = db.LoginTokens
const Sequelize = require("sequelize")
const FirstTimeModel = db.FirstTimeLogin
const Op = Sequelize.Op
// const FirstTimeModel = db.FirstTimeLogin
// const StudentProjectService = require("./StudentProjectService")
// const StudentPlacementService = require("./StudentPlacementService")
// const StudentInternshipService = require("./StudentInternshipService")
// const StudentAchievementsInternshipsServices = require("./StudentAchievementsInternshipsServices")
// const NotificationService = require("./NotificationService")
// const LoginTokensService = require("./LoginTokensService")


async function checkExists(id) {
    const students = await Student.findAll({ where: { Student_ID: id } })
    if (students.length == 0) {
        return false
    }
    else {
        return true
    }
}

const searchStudent = async (studentName) => {
    try {
        const searchedStudents = await Student.findAll({
            attributes: ["Student_ID", 'FirstName', 'LastName', "Passed_out_year"],
            where: {
                [Op.or]: [
                    {
                        Student_ID: {
                            [Op.like]: "%" + studentName + "%"
                        }
                    },
                    {
                        FirstName: {
                            [Op.like]: "%" + studentName + "%"
                        }
                    },
                    {
                        LastName: {
                            [Op.like]: "%" + studentName + "%"
                        }
                    }
                ]
            }
        })
        return JSON.parse(JSON.stringify(searchedStudents))
    }
    catch (err) {
        log.error(err)
        return false
    }
}

const createStudent = async (studentData) => {
    try {
        const id = studentData["Student_ID"]
        if (await checkExists(id)) {
            const data = await Student.update(studentData, { where: { Student_ID: id } })
        }
        else {
            studentData["Student_Photo"] = "/public/student_details/Photo/Placement_Portal_Default_Image.jpg"
            const student = await Student.create(studentData)
            const password = await FirstTimePasswordService.AddFirstTimePassword(student.Student_ID, student.Passed_out_year)
            await UserLoginService.createUserLogin(student.Student_ID, password)
            // return true
        }
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
    return true
}

const getAllStudents = async (skills = false) => {
    try {
        let students = await Student.findAll({})
        students = JSON.parse(JSON.stringify(students))
        if (skills) {
            for (let i = 0; i < students.length; i++) {
                let skillDetails = await SkillsAndAchievementsService.getSkillsAndAchievements(students[i]["Student_ID"])
                // console.log(skillDetails)
                if (skillDetails.length != 0) {
                    skillDetails = JSON.parse(JSON.stringify(skillDetails))
                    students[i]["Skills"] = skillDetails[0]["Skills"]
                }
                else {
                    students[i]["Skills"] = ""
                }
            }
        }
        // console.log("from stduenr service: ", students)
        return students
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const getOneStudent = async (id) => {
    try {
        let student = await Student.findOne({
            where: { Student_ID: id }
        })
        return student
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const updateStudent = async (data, id) => {
    try {
        if (await checkExists(id)) {
            const student = await Student.update(data, { where: { Student_ID: id } })
            const status = await FirstTimeModel.update({ Passed_out_year: data["Passed_out_year"] }, { where: { StudentId: id } })
            console.log(id)
            if(status)
            {
                return student
            }
        }
        else {
            return false
        }
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}



const CV_Upload = async (data, id) => {
    try {
        if (await checkExists(id)) {
            console.log(data)
            const student = await Student.update({ CV_Upload: data }, { where: { Student_ID: id } })
            // console.log(id)
            return student
        }
        else {
            return false
        }
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const deleteStudent = async (id) => {
    try {
        const status = await checkExists(id)
        if (!status) {
            throw "Error deleting student"
        }
        else {
            await Student.destroy({ where: { Student_ID: id } })
            UserLoginService.deleteAllUserLoginOfStudent(id)
            // StudentProjectService.deleteAllProjectOfStudent(id)
            await StudentProject.destroy({ where: { Student_ID: id } })
            // StudentPlacementService.deleteAllPlacementOfStudent(id)
            await StudentPlacement.destroy({ where: { Student_ID: id } })
            // StudentInternshipService.deleteAllInternshipOfStudent(id)
            await StudentInternship.destroy({ where: { Student_ID: id } })
            // StudentAchievementsInternshipsServices.deleteAllAchievementInternshipsOfStudent(id)
            await StudentAchievementsInternships.destroy({ where: { Student_ID: id } })
            SkillsAndAchievementsService.deleteAllSkillsAndAchievementsOfStudent(id)
            // NotificationService.deleteAllNotificationsOfStudent(id)
            await Notifications.destroy({ where: { userId: id } })
            // LoginTokensService.deleteAllLoginTokensOfStudent(id)
            await LoginTokens.destroy({ where: { LoginId: id } })
            FirstTimePasswordService.deleteAllFirstTimePasswordOfStudent(id)
            return true
        }
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const Photo_Upload = async (data, id) => {
    try {
        if (await checkExists(id)) {
            // console.log(data)
            data = data.toString()
            const student = await Student.update({ Student_Photo: data }, { where: { Student_ID: id } })
            return student
        }
        else {
            return false
        }

    } catch (error) {
        log.error(error.toString())
        return false
    }
}

module.exports = {
    createStudent,
    getOneStudent,
    getAllStudents,
    updateStudent,
    CV_Upload,
    deleteStudent,
    Photo_Upload,
    searchStudent
}