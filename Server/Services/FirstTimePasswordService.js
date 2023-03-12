const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
var CryptoJS = require("crypto-js")
var AES = require("crypto-js/aes");
const MailerService = require("./MailerService")
const FirstTimeModel = db.FirstTimeLogin
const StudentModel = db.students
const StudentService = require("./StudentService")
const { sequelize } = require("../Models/index")

const generateRandomPassword = (length) => {
    try {
        var res = ""
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@%^&*';
        var charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            const seed = parseInt((Math.random() * 10000) % (charactersLength - 1))
            res += (characters[seed])
        }
        return res
    }
    catch (err) {
        console.log(err.toString())
        return false
    }
}


const AddFirstTimePassword = async (studentId, studentPassedOutYear) => {
    try {
        const checkExists = await FirstTimeModel.findOne({
            where: {
                StudentId
                    : studentId
            }
        })
        if (!checkExists) {
            const rawPassword = generateRandomPassword(16)
            console.log(rawPassword)
            const password = AES.encrypt(rawPassword, process.env.ECRYPTION_KEY).toString()
            console.log(password)
            const payLoad = {
                StudentId: studentId,
                FirstTimePassword: password,
                Passed_out_year: studentPassedOutYear
            }
            await FirstTimeModel.create(payLoad)

            return rawPassword
        }
    }
    catch (err) {
        log.error(err.toString())
        console.log(err.toString())
        return false
    }
}


const getFirstTimePassword = async (studentId) => {
    try {
        const data = await FirstTimeModel.findOne({
            where: {
                StudentId
                    : studentId
            }
        })
        return data
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const getAllFirstTimePasswords = async (getData = false) => {
    try {
        let passwords = await FirstTimeModel.findAll({})
        passwords = JSON.parse(JSON.stringify(passwords))
        let data = {}
        for (let i = 0; i < passwords.length; i++) {
            passwords[i]["FirstTimePassword"] = AES.decrypt(passwords[i]["FirstTimePassword"], process.env.ECRYPTION_KEY).toString(CryptoJS.enc.Utf8)
            passwords[i]["id"] = i
            data[passwords[i]["StudentId"]] = { password: passwords[i]["FirstTimePassword"], student_id: passwords[i]["StudentId"] }
        }
        return getData ? data : passwords
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const sendPasswords = async (dateYear) => {
    try {
        const allPasswords = await getAllFirstTimePasswords(true)

        // console.log(JSON.parse(JSON.stringify(allPasswords)))
        dateYear = parseInt(dateYear)

        let student = await StudentModel.findAll({ where: [sequelize.where(sequelize.fn('YEAR', sequelize.col('Passed_out_year')), dateYear)] })

        student = JSON.parse(JSON.stringify(student))
        for (let i = 0; i < student.length; i++) {
            console.log("here in sending mail")

            let current_student = student[i]
            let password = allPasswords[current_student["Student_ID"]]
            // console.log(current_student)
            await MailerService.notificationMail({
                "subject": "FIRST TIME PASSWORD - PLACEMENT PORTAL @DHARMSINH DESAI UNIVERSITY", "header": "Your Access To Placement Portal", "body": `You can access the DDU placement portal via the following credentials<br/><b>Student Id:</b>${password.student_id}<br/><b>Password:</b> ${password.password}<br/>please visit ${process.env.DOMAIN}  to login`
            }, current_student["Email_ID"]
            )
        }

        // for (let i = 0; i < allPasswords.length; i++) {
        //     const date = allPasswords[i]["StudentId"][0] + allPasswords[i]["StudentId"][1]
        //     if (date == dateYear) {
        //         let student = await StudentModel.findAll({ where: { Student_ID: allPasswords[i]["StudentId"] } })
        //         student = JSON.parse(JSON.stringify(student))
        // await MailerService.notificationMail({
        //     "header": "Your Access To Placement Portal", "body": `You can access the DDU placement portal via the following credentials<br/><b>Student Id:</b>${allPasswords[i]["StudentId"]}<br/><b>Password:</b> ${allPasswords[i].FirstTimePassword}<br/>please visit ${process.env.DOMAIN}  to login`
        // }, student[0]["Email_ID"]
        // )
        //     }
        // }
        return true
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const deleteAllFirstTimePasswordOfStudent = async (id) => {
    try {
        const temp = await FirstTimeModel.findAll({ where: { StudentId: id } })
        const status = temp.length > 0 ? true : false
        if (!status) {
            throw "First Time Password record doesn't exist for the particular Student_ID"
        }
        else {
            await FirstTimeModel.destroy({ where: { StudentId: id } })
            return true
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

module.exports = {
    getAllFirstTimePasswords,
    getFirstTimePassword,
    AddFirstTimePassword,
    sendPasswords,
    deleteAllFirstTimePasswordOfStudent
}