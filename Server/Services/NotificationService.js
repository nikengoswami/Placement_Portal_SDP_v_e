const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const Notifications = db.notifications
const StudentService = require("./StudentService")
const Mailer = require("./MailerService")


const adminToSingleUserNotification = async (userId, message, sendMail = false, mailData = {}) => {

    try {
        const payLoad = {
            userId: userId,
            message: message,
            dateAdded: Date.now(),
            isSeen: false
        }
        
        const status = await Notifications.create(payLoad)
        if (status) {
            console.log(message);
            if(sendMail)
            {
                Mailer.notificationMail(mailData, userId+"@ddu.ac.in")
            }
            return true
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

const adminToBatchNotification = async (student_list, message, sendMail = false, mailData={}) => {
    try {
        let results = 0
        for (let i = 0; i < student_list.length; i++) {
            const status = await adminToSingleUserNotification(student_list[i], message, sendMail, mailData)
            if (status) {
                results += 1
            }
        }
        if (results == student_list.length) {
            return true
        }
        else {
            return false
        }
    }
    catch (err) {
        log.error("Error adminToBatchNotification!" + err.toString())
        console.log(err.toString());
        return false
    }
}

const adminToBatchDifferentNotification = async (studentMsgMap) => {
    try {
        let res = 0
        for (let i = 0; i < studentMsgMap; i++) {
            const msgObj = studentMsgMap[i]

            const status = adminToSingleUserNotification(msgObj.studentId, msgObj.message, msgObj.sendMail)

            if (status) {
                res++
            }
        }
        if (res == studentMsgMap.length) {
            return true
        }
        else {
            return false
        }
    }
    catch (err) {
        log.error("Error in adminToBatchDifferentNotification" + err.toString())
        console.log(err.toString());
        return false
    }
}


const getUserNotifications = async (student_id) => {
    try {
        const allNotifications = await Notifications.findAll({
            where: { userId: student_id }, order: [
                ['dateAdded', 'DESC'],
            ],
        })

        if (allNotifications) {
            const notifsCopy = allNotifications
            for (let i = 0; i < notifsCopy.length; i++) {
                notifsCopy.isSeen = true
            }
            const status = await Notifications.update(notifsCopy, { where: { userId: student_id } })
            if (status) {
                return allNotifications
            }
            else {
                return false
            }

        }
        else {
            return false
        }
    }
    catch (err) {
        log.error("Error in getUserNotifications" + err.toString())
        console.log(err.toString());
        return false
    }
}


const broadcastNotification = async (message) => {
    try {
        const student_list = await StudentService.getAllStudents()
        let sent = 0
        for (let i = 0; i < student_list.length; i++) {
            const status = await adminToSingleUserNotification(student_list[i]["Student_ID"], message)
            if (status) {
                sent++
            }
        }
        if (sent == student_list.length) {
            return true
        }
        else {
            return false
        }
    }
    catch (err) {
        log.error("Error in getUserNotifications" + err.toString())
        console.log(err.toString());
        return false
    }
}

const deleteAllNotificationsOfStudent = async(id) => {
    try {
        const temp = await Notifications.findAll({ where: { userId: id } })
        const status = temp.length > 0 ? true : false
        if(status)
        {
            await Notifications.destroy({ where: { userId: id } })
            return true
        }
        else
        {
            throw "Notification record doesn't exist for the particular Student_ID"
        }

    } catch (error) {
        log.error(error.toString())
        return false
    }
}

module.exports = {
    adminToBatchDifferentNotification,
    adminToBatchNotification,
    adminToSingleUserNotification,
    getUserNotifications,
    broadcastNotification,
    deleteAllNotificationsOfStudent
}