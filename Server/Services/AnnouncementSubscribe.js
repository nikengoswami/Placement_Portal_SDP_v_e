const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const Announcement = db.announcements
// const AnnouncementService = require("./AnnouncementService")

const { notificationMail } = require("./MailerService")
// const AnnouncementHelper = require("./HelperServices/AnnouncementHelper")
// import {getAnnoucement} from './AnnouncementService'
const StudentService = require("./StudentService")
const CompanyService = require("./CompanyService")

const Subscribers = db.subscribes
const NotificationService = require("./NotificationService")
const SkillsAndAchievementsService = require("./SkillsAndAchievementsService")

async function checkExists(id) {
    const announcements = await Announcement.findAll({
        where: { Announcement_ID: id }
    })
    return announcements.length > 0 ? true : false
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
            // console.log(JSON.parse(JSON.stringify(announcement)));
            return announcement
        }
    } catch (error) {
        log.error(error.toString() + id)
        return false
    }
}


const addSubsriberToAnnouncement = async (student_id, announcement_id) => {
    try {
        const payLoad = {
            Announcement_ID: announcement_id,
            Student_ID: student_id
        }
        await Subscribers.create(payLoad);
        // let announcementDetails = await AnnouncementHelper.AnnouncementService.getAnnoucement(announcement_id)
        let announcementDetails = await getAnnoucement(announcement_id)
        announcementDetails = JSON.parse(JSON.stringify(announcementDetails[0]))
        console.log(announcementDetails);
        
        const mailData = {
            "subject": "Regarding " + announcementDetails["Company_details"]["Company_name"] + ": " + announcementDetails["Job_Role"] + " Role Announcement Subscription" ,
            "header": "Applied to an Announcement Successfully",
            "body": "You will be updated regarding mentioned applied announcement for " + announcementDetails["Company_details"]["Company_name"] + " " + announcementDetails["Job_Role"] + " role",
        }
        // console.log(mailData.body);
        await NotificationService.adminToSingleUserNotification(student_id, mailData.body, true, mailData)
        return true;
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return false;
    }
}

const getSubscribedStatus = async (student_id, announcement_id) => {
    try {
        let data = await Subscribers.findAll({
            where: { Student_ID: student_id, Announcement_ID: announcement_id }
        })

        if(data) {
            console.log(data)
            if(data.length > 0) {
                return true
            }
        }
        return false
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return false;
    }
}


const removeSubscribedStatus = async (student_id, announcement_id) => {
    try {
        let data = await Subscribers.destroy({
            where: { Student_ID: student_id, Announcement_ID: announcement_id }
        })

        if(data) {
            return true
        }
        return false
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return false;
    }
}

// return students of particular announcements
const getSubscribedStudentsOfAnnouncement = async (announcement_id, skills = false) => {
    try {
        let data = await Subscribers.findAll({
            where: { Announcement_ID: announcement_id }
        })

        let students = []
        
        if(data) {
            data = JSON.parse(JSON.stringify(data))
            console.log(data)
            for(let i = 0; i < data.length; i++)
            {
                students.push(await StudentService.getOneStudent(data[i]["Student_ID"]))
            }
            
            students = JSON.parse(JSON.stringify(students))

            if(skills)
            {
                for (let i = 0; i < students.length; i++) {
                    let skillDetails = await SkillsAndAchievementsService.getSkillsAndAchievements(students[i]["Student_ID"])
                    // console.log(skillDetails)
                    if (skillDetails.length != 0) {
                        skillDetails = JSON.parse(JSON.stringify(skillDetails))
                        students[i]["Skills"] = skillDetails[0]["Skills"]
                    }
                    else {
                        students[i]["Skills"] = ""
                    }
                }
            }


            return students

        }
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return false;
    }
}

const getSubscribedAnnouncements = async (student_id) => {
    try {
        let data = await Subscribers.findAll({
            where: { Student_ID: student_id }
        })

        let announcements = []
        if (data) {
            // announcements = []
            let flag = false;
            data = JSON.parse(JSON.stringify(data))
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                let elem = data[i]
                // let announcement_data = await AnnouncementHelper.AnnouncementService.getAnnoucement(elem["Announcement_ID"])
                let announcement_data = await getAnnoucement(elem["Announcement_ID"])
                if (announcement_data) {
                    console.log(JSON.parse(JSON.stringify(announcement_data)));
                    announcements.push(JSON.parse(JSON.stringify(announcement_data))[0])
                }
            }
            // console.log("Announcement List:");
            // console.log(announcements);
            return announcements


        }
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return false;
    }
}

module.exports = {
    addSubsriberToAnnouncement,
    getSubscribedAnnouncements,
    getSubscribedStatus,
    removeSubscribedStatus,
    getSubscribedStudentsOfAnnouncement
}