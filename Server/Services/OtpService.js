const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const OTPModel = db.Otps
const StudentModel = db.students
const MailerService = require("./MailerService")
const UserLoginService = require("./UserLoginService")
const OTP_LEN = 6
const generateOtp = async (studentId) => {
    try {
        let otpLen = Math.pow(10, 6)
        let otp = parseInt(Math.random() * otpLen)
        let payLoad = {
            otp: otp,
            validTill: new Date(),
            isUsed: false,
            studentId: studentId
        }
        const status = await OTPModel.create(payLoad)
        return status ? otp : false
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const verifyOtp = async (verify_otp, studentId) => {
    try {
        let otp = await OTPModel.findAll({ where: { otp: verify_otp, studentId: studentId } })
        if (otp.length == 1) {
            const dateValid = otp[0].validTill
            console.log("Otp valid")
            const timeAdded = new Date(dateValid).getTime()
            const timeExpiry = Date.now()
            if (timeAdded + 300000 > timeExpiry) {
                console.log(timeAdded + 300000, timeExpiry)

                let status = await OTPModel.destroy({ where: { studentId: studentId } })
                let otpObj = JSON.parse(JSON.stringify(otp[0]))

                otpObj.isUsed = true
                console.log(otpObj)
                let status1 = await OTPModel.create(otpObj)

                return "Valid OTP"
            }
            else {
                return "OTP Time Expired. Please try again"
            }
        }
        else {
            console.log("Otp Length", otp.length)
            return "Invalid OTP!"
        }
    }
    catch (err) {
        log.error(err.toString())
        return "Oops Some error occured while verifying your OTP"
    }
}

const sendOtp = async (studentid) => {
    try {
        const student = await StudentModel.findOne({
            where: {
                Student_ID
                    : studentid
            }
        })
        if (student) {
            let userLogin = await UserLoginService.getUserLoginObj(studentid)
            console.log("Userlogin.....")
            console.log(userLogin)
            userLogin = JSON.parse(JSON.stringify(userLogin))
            if(userLogin[0].IsFirstTime)
            {
                console.log("Inside the first time")
                return "Login using first time password!"
            }
            const otp = await generateOtp(studentid)
            if (otp) {
                const messagePayload = {
                    header: "",
                    subject: "Your OTP for password change",
                    body: `<h2>Your OTP is: ${otp}</h2><br/><b>The otp would be valid for only 5 minutes</b><br/><b>Use this to reset your passowrd.</b>`
                }

                const mailStatus = await MailerService.notificationMail(messagePayload, student.Email_ID)
                if (mailStatus) {
                    return "An OTP has been sent to your email-id."
                }
                else {
                    return "Oops some error occured while sending you a mail!"
                }
            }
        }
        else {
            return "No student with this ID found!"
        }
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

module.exports = {
    verifyOtp,
    generateOtp,
    sendOtp
}