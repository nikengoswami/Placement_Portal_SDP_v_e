const logger = require("serverloggerjs/logger")
const log = new logger(true)
const ResponseService = require("../Services/ResponseService")
const OK = ResponseService.OK
const ERROR = ResponseService.ERROR

const LogoutStudent = async (req, res) => {
    try {
        await res.clearCookie('LoginToken');
        await res.clearCookie('UserId');
        return OK(res, "Successfully logged out!")
    }
    catch (err) {
        log.error(err.toString())
        return ERROR(res, "Error logging out student!")
    }
}

const LogoutAdmin = async (req, res) => {
    try {
        await res.clearCookie('AdminLoginToken');
        return OK(res, "Successfully logged out!")
    }
    catch (err) {
        log.error(err.toString())
        return ERROR(res, "Error logging out admin!")
    }
}

module.exports = {
    LogoutStudent,
    LogoutAdmin
}