var CryptoJS = require("crypto-js")
var AES = require("crypto-js/aes");
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


export default VerifyAdminCookie