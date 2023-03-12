const AdminLoginService = require("../../Services/AdminLoginService")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const ResponseService = require("../../Services/ResponseService")
const OK = ResponseService.OK
const RESP = ResponseService.RESP
const ERROR = ResponseService.ERROR
const AUTHERROR = ResponseService.AUTHERROR
const StudentAuthenticate = require("../StudentLogin/Authenticate")
const AdminAuthenticate = require("../Admin/AdminAuthenticate")

const ResolveUserMiddleware = function (req, res, next) {
    try {
        const AdminloginToken = req.cookies.AdminLoginToken
        const studentLoginToken = req.cookies.LoginToken
        if (AdminloginToken != undefined) {
            console.log("Admin Login Tokn ", AdminloginToken)
            AdminAuthenticate.AdminAuthenticate(req, res, next)
        }
        else if (studentLoginToken != undefined) {

            StudentAuthenticate(req, res, next)
        }
        else {
            throw "No authenticated user found!"
        }
    }
    catch (err) {
        log.error(err.toString())

        return AUTHERROR(res, "No authenticated user is found!!!!!", "apne chacha ke ghar jaye")
    }
}

module.exports = {
    ResolveUserMiddleware
}