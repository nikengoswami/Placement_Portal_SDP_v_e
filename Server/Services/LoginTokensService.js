const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const LoginTokens = db.LoginTokens
const jwt = require("jsonwebtoken")

const addToken = async (loginId) => {
    try {
        const token = jwt.sign({ id: loginId }, "SECRETKEY")
        const payLoad = { LoginId: loginId, Token: token }
        const status = await LoginTokens.create(payLoad)
        if (status) {
            return token
        }
        else {
            return false
        }
    }
    catch (err) {
        log.error("Error adding tokens!" + err.toString())
        console.log(err.toString());
        return false
    }
}

const deleteAllLoginTokensOfStudent = async (id) => {
    try {
        const temp = await LoginTokens.findAll({ where: { LoginId: id } })
        const status = temp.length > 0 ? true : false
        if(status)
        {
            await LoginTokens.destroy({ where: { LoginId: id } })
            return true
        }
        else
        {
            throw "Login Token record doesn't exist for the particular Student_ID"
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}


module.exports = {
    addToken,
    deleteAllLoginTokensOfStudent
}