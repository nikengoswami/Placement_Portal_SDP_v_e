var CryptoJS = require("crypto-js")
var AES = require("crypto-js/aes");
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
export default SetClientStudentCookies