const e = require("express")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const StudentLoginService = require("../../Services/UserLoginService")
const authenticate = async (req, res, next) => {
    try {
        // console.log("Hereee");
        // console.log(req.cookies.LoginToken);
        const loginToken = req.cookies.LoginToken
        const userId = req.cookies.UserId
        let userObj = await StudentLoginService.verifyUser(loginToken, userId)
        // console.log(userObj);
        if (userObj) {
            userObj = JSON.parse(JSON.stringify(userObj))
            // console.log(userObj);
            req.username = userObj["FirstName"] + " " + userObj["MiddleName"][0] + " " + userObj["LastName"]
            req.userId = userObj["Student_ID"]
            req.userObj = userObj;
            req.params.studentId = userId
            // console.log(req.username);
            // console.log(req.userId);

        }
        else {
            throw "user obj not found!!"
        }

    }
    catch (err) {
        log.error("Error in authenticate student middleware!" + err.toString())
        return res.json({ status: false, redirect: true, redirectUrl: "/_student/login" })
    }
    next()
}
module.exports = authenticate