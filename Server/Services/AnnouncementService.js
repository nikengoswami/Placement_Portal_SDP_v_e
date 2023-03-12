const logger = require("serverloggerjs/logger")
const multer = require('multer');
const path = require('path');
const { announcements } = require("../Models/index")
const log = new logger(true)
const db = require("../Models/index")
const CompanyService = require("./CompanyService");
const BranchAnnouncementService = require("./BranchAnnouncementService")
const AnnouncementSubscribeService = require("./AnnouncementSubscribe");
// const AnnouncementHelper = require('./HelperServices/AnnouncementHelper')
const NotificationService = require("./NotificationService");
// const AnnouncementSubscribe = require("../Models/AnnouncementSubscribe");
const Announcement = db.announcements

async function checkExists(id) {
    const announcements = await Announcement.findAll({
        where: { Announcement_ID: id }
    })
    return announcements.length > 0 ? true : false
}

const createdAnnoucement = async (announcementData, job_description_file) => {
    try {
        console.log(announcementData)
        const dat = Date.parse(announcementData["Date_of_Visit"])
        // const fileName = "./public/" + announcementData["Company_ID"] + "-" + dat.toString() + ".pdf"
        const fileName = job_description_file
        if (fileName != null || fileName != "" || fileName != undefined) {

            announcementData["Job_Description_File"] = fileName
        }
        else {
            announcementData["Job_Description_File"] = ""
        }
        // announcementData["Company_ID"] = 3 // Temporary static
        announcementData["IsOpen"] = true // Temporary static
        const branches = announcementData["Eligible_Branches"].split(",")
        // console.log(branches)
        announcementData["Eligible_Branches"] = ""
        await Announcement.create(announcementData)
        let aData = await Announcement.findAll({
            order: [
                ['Announcement_ID', 'DESC'],
            ],
        })
        aData = JSON.parse(JSON.stringify(aData))[0]
        console.log("FileName", fileName)
        // console.log("Here", JSON.parse(JSON.stringify(aData))[0])
        for (let i = 0; i < branches.length; i++) {
            const status = await BranchAnnouncementService.addBranchToAnnouncement(aData.Announcement_ID, branches[i])
        }
        return true
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const getAllAnnoucements = async () => {
    try {
        let announcements = await Announcement.findAll({
            order: [
                ['Announcement_ID', 'DESC']]
        })
        if (announcements) {
            announcements = JSON.parse(JSON.stringify(announcements))
            for (let i = 0; i < announcements.length; i++) {
                const company = await CompanyService.getCompany(announcements[i].Company_ID)
                announcements[i]["Company_details"] = JSON.parse(JSON.stringify(company))
            }
        }
        return announcements
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const getAnnoucement = async (id) => {
    try {
        const status = await checkExists(id)
        if (!status) {
            throw "Error finding announcement detials"
        }
        else {
            let announcement = await Announcement.findAll({
                where: { Announcement_ID: id }
            })
            announcement = JSON.parse(JSON.stringify(announcement))

            // console.log(JSON.parse(JSON.stringify(announcement)));
            let company = await CompanyService.getCompany(announcement[0].Company_ID)
            announcement[0]["Company_details"] = company

            let branches = await BranchAnnouncementService.getBranchesOfAnnouncement(announcement[0]["Announcement_ID"])
            branches = JSON.parse(JSON.stringify(branches))

            announcement[0]["Eligible_Branches"] = branches

            return announcement
        }
    } catch (error) {
        log.error(error.toString() + id)
        return false
    }
}

const updateAnnoucement = async (data, id, sendNotification = false, job_description_file = "") => {
    try {
        const status = await checkExists(id)
        if (!status) {
            throw "Announcement doesn't exist"
        }
        else {
            console.log(JSON.parse(JSON.stringify(data)))
            // console.log(data["Eligible_Branches"])
            const fileName = job_description_file
            if (fileName != "") {

                data["Job_Description_File"] = fileName
            }

            console.log("File Naem", fileName == "")
            // return false
            // data["Job_Description_File"] = fileName
            await BranchAnnouncementService.deleteBranchesOfAnnouncement(id)
            let branches = data["Eligible_Branches"].split(",")
            for (let i = 0; i < branches.length; i++) {
                await BranchAnnouncementService.addBranchToAnnouncement(id, branches[i])
                // console.log(branches[i])
            }
            data["Eligible_Branches"] = ""
            const announcement = await Announcement.update(data, { where: { Announcement_ID: id } })

            if (sendNotification) {
                let students = await AnnouncementSubscribeService.getSubscribedStudentsOfAnnouncement(id)
                students = JSON.parse(JSON.stringify(students))
                const student_list = []
                for (let i = 0; i < students.length; i++) {
                    student_list.push(students[i].Student_ID)
                }

                // console.log(student_list)

                const announcementDetails = await getAnnoucement(id)

                const message = announcementDetails[0]["Company_details"]["Company_name"] + " " + announcementDetails[0]["Job_Role"] + " has been updated. Please check the updated announcement details!"

                const mailData = {
                    "subject": "DDU Placement Cell - " + announcementDetails[0]["Company_details"]["Company_name"] + " announcement has been updated!",
                    "header": message,
                    "body": ""
                }

                const status = await NotificationService.adminToBatchNotification(student_list, message, true, mailData)

                if (status) {
                    return true
                }
                else {
                    throw "Error in sending the notifications!!"
                }
            }

            return true
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const deleteAnnoucement = async (id) => {
    try {
        const status = await checkExists(id)
        if (!status) {
            throw "Error deleting announcement"
        }
        else {
            await Announcement.destroy({ where: { Announcement_ID: id } })
            return true
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

module.exports = {
    createdAnnoucement,
    getAllAnnoucements,
    getAnnoucement,
    updateAnnoucement,
    deleteAnnoucement
}