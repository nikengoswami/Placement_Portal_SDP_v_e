var CryptoJS = require("crypto-js")
var AES = require("crypto-js/aes");
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
export default VerifyStudentCookie