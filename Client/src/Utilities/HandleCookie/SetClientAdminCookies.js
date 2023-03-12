var CryptoJS = require("crypto-js")
var AES = require("crypto-js/aes");

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
export default SetClientAdminCookies