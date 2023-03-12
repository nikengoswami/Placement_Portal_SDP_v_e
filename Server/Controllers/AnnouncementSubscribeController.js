const Subscibe = require("../Services/AnnouncementSubscribe")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const AnnouncementService = require("../Services/AnnouncementService")
const AnnouncementSubscribeService = require("../Services/AnnouncementSubscribe")
const ZippingService = require("../Services/ZippingService")
const ResponseService = require("../Services/ResponseService")
const OK = ResponseService.OK
const ERROR = ResponseService.ERROR

const addStudentToAnnouncement = async (req, res) => {
    try {
        const studentId = req.userId
        const status = Subscibe.addSubsriberToAnnouncement(studentId, req.params.announcementId)
        if (status) {
            return res.json({ status: true, data: "Announcement applied successfully!" })
        }
        else {
            throw "Error in Subscribing student. Status returned false."
        }
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return res.json({ status: false, data: "Error! While applying to announcement!" })
    }
}


const getSubscribedStatus = async (req, res) => {
    try {
        const studentId = req.userId
        const status = await Subscibe.getSubscribedStatus(studentId, req.params.announcementId)

        if (status) {
            return res.json({ status: true })
        }
        else {
            return res.json({ status: false })
        }
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return res.json({ status: false, data: "Error! While fetching status!" })
    }
}


const removeStudentToAnnouncement = async (req, res) => {
    try {
        const studentId = req.userId
        const status = await Subscibe.removeSubscribedStatus(studentId, req.params.announcementId)

        if (status) {
            return res.json({ status: true })
        }
        else {
            return res.json({ status: false })
        }
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return res.json({ status: false, data: "Error! While fetching status!" })
    }
}

const getSubscribedAnnouncements = async (req, res) => {
    try {
        // const student_id = "19CEUOS003"
        const student_id = req.userId
        const data = await Subscibe.getSubscribedAnnouncements(student_id)
        if (data) {
            return res.json({ status: true, data: data })
        }
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return res.json({ status: false, data: "Error! While fetching subscribed announcements!" })
    }
}


const getSubscribedStudentsOfAnnouncement = async (req, res) => {
    try {
        const announcement_id = req.params.announcementId
        const data = await Subscibe.getSubscribedStudentsOfAnnouncement(announcement_id, true)
        if (data) {
            return res.json({ status: true, data: data })
        }

    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return res.json({ status: false, data: "Error! While fetching subscribed students!" })
    }
}

const downloadSubscribedStudentZip = async (req, res) => {
    // try {
    //     const announcement_id = req.params.announcementId
    //     let announcement_details = await AnnouncementService.getAnnoucement(announcement_id)
    //     // console.log(JSON.parse(JSON.stringify(announcement_details)));
    //     const zipName = announcement_id + "_" + announcement_details[0]["Company_details"]["Company_name"] + "_" + announcement_details[0]["Job_Role"]
    //     // console.log(zipName);
    //     const subscribedStudents = await AnnouncementSubscribeService.getSubscribedStudentsOfAnnouncement(announcement_id)
    //     const subscribedStudentList = []
    //     const filesList = []
    //     subscribedStudents.map((student) => {
    //         subscribedStudentList.push(
    //             student["Student_ID"])

    //         filesList.push(student["CV_Upload"])
    //     })
    //     // console.log("ehjk");
    //     // console.log(subscribedStudentList);
    //     // const data = await ZippingService.downloadZipFile("../public/student_details/CV/", zipName, subscribedStudentList)

    //     const resp = await ZippingService.createSharedFolderLink(subscribedStudentList, filesList, zipName)

    //     return OK(res, resp);
    // }
    // catch (err) {
    //     console.log(err.toString());
    //     log.error(err.toString())
    //     return res.json({ status: false, data: "Error Fetching student data!" })
    // }
    try {
        const announcement_id = req.params.announcementId
        let announcement_details = await AnnouncementService.getAnnoucement(announcement_id)
        // console.log(JSON.parse(JSON.stringify(announcement_details)));
        const zipName = announcement_id + "_" + announcement_details[0]["Company_details"]["Company_name"]
        // console.log(zipName);
        const subscribedStudents = await AnnouncementSubscribeService.getSubscribedStudentsOfAnnouncement(announcement_id)
        const subscribedStudentList = []
        subscribedStudents.map((student) => {
            subscribedStudentList.push(student["Student_ID"])
        })
        const data = await ZippingService.downloadZipFile("../public/student_details/CV/", zipName, subscribedStudentList)

        res.set('Content-Type', 'application/octet-stream');
        res.set('Content-Disposition', `attachment; filename=${zipName
            }.zip`);
        res.set('Content-Length', data.length);
        return res.send(data);
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return res.json({ status: false, data: "Error! While downloading zip!" })
    }


}

module.exports = {
    addStudentToAnnouncement,
    getSubscribedAnnouncements,
    getSubscribedStatus,
    removeStudentToAnnouncement,
    getSubscribedStudentsOfAnnouncement,
    downloadSubscribedStudentZip
}