const db = require("../Models")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const NotificationService = require("../Services/NotificationService")

const getUserNotifications = async (req, res) => {
    try {
        const studentId = req.userId
        const notifications = await NotificationService.getUserNotifications(studentId)
        if (notifications) {
            return res.json({ data: notifications, status: true })
        }
        else {
            return res.json({ data: [], status: true })
        }
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ data: "Error! While fetching notifications!", status: false })
    }
}
module.exports = {
    getUserNotifications
}