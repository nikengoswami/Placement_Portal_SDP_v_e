const AdminLoginService = require("../../Services/AdminLoginService")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const ResponseService = require("../../Services/ResponseService")
const OK = ResponseService.OK
const RESP = ResponseService.RESP
const ERROR = ResponseService.ERROR
const AUTHERROR = ResponseService.AUTHERROR


const AdminAuthenticate = async (req, res, next) => {
    try {
        console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
        const AdminloginToken = req.cookies.AdminLoginToken
        let adminObj = await AdminLoginService.getAdminLogin(AdminloginToken)

        if (adminObj) {
            adminObj = JSON.parse(JSON.stringify(adminObj))
            req.adminObj = adminObj
            next()
        }
        else {
            throw "No admin object found!"
        }

    }
    catch (error) {
        log.error(error.toString())

        return AUTHERROR(res, "Admin is not verified!", "/admin/login")
        // return ERROR(res, "Admin is not verified!")
    }

}

module.exports = {
    AdminAuthenticate
}