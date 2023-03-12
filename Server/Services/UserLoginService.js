const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const UserLogin = db.userLogin
const SHA256 = require("crypto-js/sha256")
var CryptoJS = require("crypto-js")
var AES = require("crypto-js/aes");
const LoginTokenService = require("./LoginTokensService")
const StudentService = require("./StudentService")
const FirstTimePasswordService = require("./FirstTimePasswordService")
const jwt = require("jsonwebtoken")
const Student = db.students
// const { where } = require("sequelize/dist")

const getUserLoginObj = async (studentId) => {
    try {
        const userLoginObj = await UserLogin.findAll({ where: { LoginId: studentId } })
        return userLoginObj
    }
    catch (err) {
        log.error(err)
        return false
    }
}

const createUserLogin = async (studentId, password) => {
    try {
        // const userDob = new Date(DOB)
        // const userPassword = userDob.getDate() + "/" + userDob.getMonth() + "/" + userDob.getFullYear()
        await UserLogin.create({ Password: SHA256(password).toString(), LoginId: studentId, IsFirstTime: true })
    }
    catch (err) {
        log.error("Error creating user login!", err.toString())
        return false
    }
    return true
}

const addFreshPassword = async (studentId, password) => {
    try {
        const userLoginObj = await getUserLoginObj(studentId)
        if (userLoginObj && userLoginObj.IsFirstTime) {
            const passwordHash = SHA256(password).toString()
            const data = { Password: passwordHash, IsFirstTime: false }
            const status = await UserLogin.update(data, { where: { studentId } })
            if (status) {
                return true
            }
            else {
                return false
            }
        }
        else {
            return false
        }

    }
    catch (err) {
        return false
    }
}


const changePasswordForce = async (studentId, newPassword) => {
    try {
        let userLoginObj = await getUserLoginObj(studentId);
        userLoginObj = (JSON.parse(JSON.stringify(userLoginObj)))[0]
        if (userLoginObj) {

            const status1 = passwordFormatChecker(newPassword)
            if (status1 == "OK") {

                const status = await UserLogin.update({ Password: SHA256(newPassword).toString() }, { where: { LoginId: studentId } })
                if (status) {
                    return "Your password has been updated successfully"
                }
                else {
                    return "Some error occured while updating your password"
                }
            }
            else {
                return status1
            }
        }
    }
    catch (err) {
        log.error(err)
        return "Oops some error occured while changing your password!"
    }
}


const changePassword = async (studentId, oldPassword, newPassword) => {
    try {

        let userLoginObj = await getUserLoginObj(studentId);
        userLoginObj = (JSON.parse(JSON.stringify(userLoginObj)))[0]
        if (userLoginObj) {
            const oldPasswordHash = SHA256(oldPassword).toString()
            console.log(userLoginObj.Password, oldPasswordHash)
            console.log("OK till here")
            if (oldPasswordHash == userLoginObj.Password) {
                const passStatus = passwordFormatChecker(newPassword)
                if (passStatus == "OK") {
                    const status = await UserLogin.update({ Password: SHA256(newPassword).toString() }, { where: { LoginId: studentId } })
                    if (status) {
                        return true
                    }
                    else {
                        return false
                    }
                }
                else {
                    return passStatus
                }
            }
            else {
                return "Your old password is not correct"
            }
        }
        else {
            return false
        }
    }
    catch (err) {
        return false
    }
}


const loginUser = async (loginId, password) => {
    try {
        const loginObj = await UserLogin.findAll({ where: { LoginId: loginId, Password: SHA256(password).toString() } })

        if (loginObj.length == 0) {
            return false
        }
        else {
            // console.log(loginObj)
            const IsFirstTime = JSON.parse(JSON.stringify(loginObj))[0]["IsFirstTime"]
            if (IsFirstTime) {
                return "Please Set your password to continue"
            }
            else {
                const token = await LoginTokenService.addToken(loginId);
                if (token) {
                    return token
                }
                else {
                    return false
                }
            }
        }
    }
    catch (err) {
        return false
    }
}

const verifyUser = async (token, userId) => {
    try {
        // console.log(token);
        const uid = jwt.verify(token, "SECRETKEY")
        // console.log(userId);
        // console.log(uid.id);
        if (userId.toString() == uid.id.toString()) {
            // console.log("here");
            let student = await Student.findOne({
                where: { Student_ID: userId.toString() }
            })
            return student
        }
        else {
            // console.log("false");
            return false;
        }
    }
    catch (err) {
        return false
    }
}


const passwordFormatChecker = (password) => {
    if (password.length <= 7) {
        return "Too small password! password must be atleast 8 characters long."
    }
    else {
        return "OK"
    }
}


const changePasswordFirstTime = async (studentId, oldPassword, newPassword) => {
    try {
        let firstTimePassword = await FirstTimePasswordService.getFirstTimePassword(studentId)
        firstTimePassword = (JSON.parse(JSON.stringify(firstTimePassword)))
        if (firstTimePassword) {
            const decryptedPassword = AES.decrypt(firstTimePassword.FirstTimePassword, process.env.ECRYPTION_KEY).toString(CryptoJS.enc.Utf8)
            if (decryptedPassword == oldPassword) {
                // change userlogin first time to false and update password
                const msg = passwordFormatChecker(newPassword)
                if (msg == "OK") {

                    let userLoginObj = await getUserLoginObj(studentId)
                    userLoginObj.Password = SHA256(newPassword).toString()
                    userLoginObj.IsFirstTime = false

                    console.log(userLoginObj)

                    const status = await UserLogin.update(userLoginObj, { where: { LoginId: studentId } })

                    if (status) {
                        return "Password updated successfully"
                    }
                    else {
                        return "Error updating password!"
                    }
                }
                else {
                    return msg
                }
            }
            else {
                console.log("Here150")
                return "First time password is not correct!"
            }



        }

        else {
            return "Oops you are not verified"
        }
    }
    catch (err) {
        console.log(err.toString())
        return "Oops you are not verified"
    }

}

const deleteAllUserLoginOfStudent = async (id) => {
    try {
        const temp = await UserLogin.findAll({ where: { LoginId: id } })
        const status = temp.length > 0 ? true : false
        if (status) {
            await UserLogin.destroy({ where: { LoginId: id } })
            return true
        }
        else {
            throw "User Login record doesn't exist for the particular Student_ID"
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

module.exports = {
    addFreshPassword,
    changePassword,
    createUserLogin,
    changePasswordFirstTime,
    loginUser,
    verifyUser,
    changePasswordForce,
    deleteAllUserLoginOfStudent,
    getUserLoginObj
}