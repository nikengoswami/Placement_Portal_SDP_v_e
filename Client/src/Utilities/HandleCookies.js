var CryptoJS = require("crypto-js")
var AES = require("crypto-js/aes");
// var SHA256 = require("crypto-js/sha256");

const SetClientAdminCookies = async function (adminId, expiryTime) {
    try {
        let exp = new Date(expiryTime)
        let aid = AES.encrypt(adminId, process.env.React_App_Encryption_Key).toString().toString()
        localStorage.setItem("AdminAuthentication", JSON.stringify({ "adminId": aid, "expiry": exp }))
        console.log("helr")

    }
    catch (err) {
        console.log(err)
        console.log("Error setting admin client cookies")
    }
}
const SetClientStudentCookies = async function (studentId, expiryTime) {
    try {
        // console.log("Here too1")
        let exp = new Date(expiryTime)
        let sid = AES.encrypt(studentId, process.env.React_App_Encryption_Key).toString().toString()
        localStorage.setItem("StudentAuthentication", JSON.stringify({ "studentId": sid, "expiry": exp }))
    }
    catch (err) {
        console.log("Error setting student client cookies")
    }
}
const RemoveClientAdminCookies = async function (history) {
    try {
        let expiryTime = new Date(expiryTime)
        document.cookie = "adminId=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie += "isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }
    catch (err) {
        console.log("Error Removing Admin client cookies")
    }
}
const RemoveClientStudentCookies = async function (history) {
    try {
        document.cookie = "studentId=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
        document.cookie = "isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
    }
    catch (err) {

        console.log("Error setting Student client cookies")
    }
}

const parseCookies = function (cookieData) {
    try {
        let retDict = {}
        let cookies = cookieData.split(";")
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].split("=")
            retDict[cookie[0]] = cookie[1]
        }
        return retDict
    }
    catch (err) {

        console.log("Error parsing cookies")
    }
}

const VerifyAdminCookie = function () {
    try {

        const AuthenticationData = JSON.parse(localStorage.getItem("AdminAuthentication"))
        const expiryDate = AuthenticationData.expiry
        const adminId = AuthenticationData.adminId
        const currentDate = Date.now()
        let exp = new Date(expiryDate).getTime()
        console.log(currentDate, exp)
        if (currentDate <= exp) {
            const decryptedData = AES.decrypt(adminId, process.env.React_App_Encryption_Key).toString(CryptoJS.enc.Utf8)
            if (decryptedData == "admin") {
                return true
            }
            else {
                throw "Malicious user found!"
            }
        } else {
            throw "Expiry date reached"
        }

    }
    catch (err) {
        console.log(err.toString())
        return false
    }
}
const VerifyStudentCookie = function () {
    try {

        const AuthenticationData = JSON.parse(localStorage.getItem("StudentAuthentication"))
        const expiryDate = AuthenticationData.expiry
        const studentId = AuthenticationData.studentId
        const currentDate = Date.now()
        let exp = new Date(expiryDate).getTime()

        if (currentDate <= exp) {
            const decryptedData = AES.decrypt(studentId, process.env.React_App_Encryption_Key).toString(CryptoJS.enc.Utf8)

            let year = parseInt(decryptedData[0] + decryptedData[1])
            let branch = decryptedData[2] + decryptedData[3]
            let admissionType = decryptedData[4] + decryptedData[5] + decryptedData[6]
            let admissionNumber = parseInt(decryptedData[7] + decryptedData[8] + decryptedData[9])

            if (year <= 0 && year >= 99) {
                throw "Year not in range"
            }
            else if (admissionNumber <= 0 && admissionNumber >= 999) {
                throw "Admission number not in range"
            }

        }
        else {
            throw "Student token is expired!!!"
        }


        return true

    }
    catch (err) {
        console.log(err)
        return false
    }
}


export default {
    SetClientAdminCookies,
    SetClientStudentCookies,
    RemoveClientAdminCookies,
    RemoveClientStudentCookies,
    parseCookies,
    VerifyAdminCookie,
    VerifyStudentCookie
}