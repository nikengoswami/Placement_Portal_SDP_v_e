const db = require("../Models")
const multer = require('multer');
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const Announcement = db.announcements
const AnnouncementService = require("../Services/AnnouncementService");
const NotificationService = require("../Services/NotificationService")
const CompanyService = require("../Services/CompanyService");
const CommentService = require("../Services/CommentService");
const ResponseService = require("../Services/ResponseService")
const OK = ResponseService.OK
const ERROR = ResponseService.ERROR
const RESP = ResponseService.RESP
const { request } = require("express");
const { companies } = require("../Models");

async function checkExists(id) {
    const annoucements = await Announcement.findAll({ where: { Announcement_ID: id } })
    return annoucements.length > 0 ? true : false
}



const addAnnoucement = async (req, res) => {
    // try {
    //     console.log("Here in body")
    //     console.log(req.body);

    //     const { Company_ID, Date_of_Visit, Date_of_announcement,
    //         Eligible_Branches, Passed_out_year, Job_Role, Salary, Job_Location, Bond_Details, Other_Details, Job_Description_File, Registration_Deadline, Eligibility, IsOpen } = req.body;

    //     if (req.emptyField) {
    //         throw req.empty_arr[0] + " cannot be empty!!"
    //     }
    //     // valid
    //     else {
    //         let annoucement = {
    //             Company_ID: Company_ID,
    //             Date_of_Visit: Date_of_Visit,
    //             Date_of_announcement: Date_of_announcement,
    //             Eligible_Branches: Eligible_Branches,
    //             Passed_out_year: Passed_out_year,
    //             Job_Role: Job_Role,
    //             Salary: Salary,
    //             Job_Location: Job_Location,
    //             Bond_Details: Bond_Details,
    //             Other_Details: Other_Details,
    //             Job_Description_File: Job_Description_File,
    //             Registration_Deadline: Registration_Deadline,
    //             Eligibility: Eligibility,
    //             IsOpen: IsOpen
    //         }
    //         // console.log(annoucement);
    //         // console.log("Req.file: ", req);
    //         // const job_description_file = req.file

    //         const annoucementStatus = await AnnouncementService.createdAnnoucement(req.body, req.fileName)
    //         const company_name = await CompanyService.getCompany(Company_ID)
    //         const status = await NotificationService.broadcastNotification(company_name.Company_name + " opened a new " + Job_Role + " position check out announcement in your dashboard!")
    //         console.log(status);
    //         if (annoucementStatus) {
    //             return res.json({ data: "Announcement Created", status: true })
    //         }
    //         else {
    //             throw "Error from createdAnnoucement controller. Status returned false."
    //         }
    //     }
    // }
    // catch (e) {
    //     console.log(e.toString());
    //     res.json({ status: false, data: "Error! While adding announcement!" })
    // }
    try {

        // console.log(req);

        const { Company_ID, Date_of_Visit, Date_of_announcement,
            Eligible_Branches, Passed_out_year, Job_Role, Salary, Job_Location, Bond_Details, Other_Details, Job_Description_File, Registration_Deadline, Eligibility, IsOpen } = req.body;

        if (req.emptyField) {
            throw req.empty_arr[0] + " cannot be empty!"
        }
        // valid
        else {
            let annoucement = {
                Company_ID: Company_ID,
                Date_of_Visit: Date_of_Visit,
                Date_of_announcement: Date_of_announcement,
                Eligible_Branches: Eligible_Branches,
                Passed_out_year: Passed_out_year,
                Job_Role: Job_Role,
                Salary: Salary,
                Job_Location: Job_Location,
                Bond_Details: Bond_Details,
                Other_Details: Other_Details,
                Job_Description_File: Job_Description_File,
                Registration_Deadline: Registration_Deadline,
                Eligibility: Eligibility,
                IsOpen: IsOpen
            }
            // console.log(annoucement);
            // console.log("Req.file: ", req);
            // const job_description_file = req.file

            const annoucementStatus = await AnnouncementService.createdAnnoucement(req.body, req.fileName)
            const company_name = await CompanyService.getCompany(Company_ID)
            const status = await NotificationService.broadcastNotification(company_name.Company_name + " opened a new " + Job_Role + " position check out announcement in your dashboard!")
            console.log(status);
            if (annoucementStatus) {
                return res.json({ data: "Announcement created successfully!", status: true })
            }
            else {
                throw "Error from createdAnnoucement controller. Status returned false."
            }
        }
    }
    catch (e) {
        console.log(e.toString());
        res.json({ status: false, data: "Error! While adding announcement!" })
    }
}

// returns all annoucements
const getAllAnnoucements = async (req, res) => {
    try {
        let announcements = await AnnouncementService.getAllAnnoucements()
        if (announcements) {
            // console.log("HERE")
            return RESP(res, announcements.length == 0 ? false : true, announcements.length == 0 ? "No Announcement data!" : announcements)
            // return res.json({ status: announcements.length == 0 ? false : true, data: announcements.length == 0 ? "No Student data!" : announcements })
        }
        else {
            throw "Error in getAllAnnoucements. Status returned false."
        }
    }
    catch (e) {
        log.error(e.toString())
        // console.log(e.toString());
        return ERROR(res, "Error! While fething announcements!")
        // res.json({ status: false, data: e.toString() })
    }

}

// return one annoucment by its id
const getAnnoucement = async (req, res) => {

    try {
        const id = req.params.annoucementId
        let announcement = await AnnouncementService.getAnnoucement(id)

        if (announcement) {
            var announcement_data = JSON.parse(JSON.stringify(announcement))
            console.log(announcement_data[0]["Company_ID"]);

            let company = await CompanyService.getCompany(announcement_data[0]["Company_ID"])

            announcement_data[0]["Company_Details"] = company
            // console.log(JSON.parse(JSON.stringify(company)))
            return RESP(res, announcement.length == 0 ? false : true, announcement.length == 0 ? "Annoucement Not Found!" : announcement_data)

            // return res.json({ status: announcement.length == 0 ? false : true, data: announcement.length == 0 ? "Annoucement Not Found!" : announcement_data })
        }
        else {
            throw "Error in getAnnouncement. Status returned false."
        }
    }
    catch (e) {
        log.error(e.toString())
        // console.log(e.toString());
        return ERROR(res, "Error! While fething this announcement!")
        // res.json({ status: false, data: e.toString() })
    }

}

const updateAnnoucement = async (req, res) => {
    try {
        const id = req.params.annoucementId
        console.log(req.fileName)
        const annoucement = await AnnouncementService.updateAnnoucement(req.body, id, true, req.fileName)
        if (annoucement) {
            return OK(res, "Announcement updated successfully!")
            // return res.json({ status: true, data: "Announcement Updated!!" })
        }
        else {
            // return ERROR(res, "Error updating Announcement !!!")
            throw "Error updating Announcement. Status returned false."
            // return res.json({ status: false, data: "Error updating Announcement !!!" })
        }
    }
    catch (e) {
        // console.log(e.toString());
        log.error(e.toString())
        return ERROR(res, "Error! While updating announcement!")
        // res.json({ status: false, data: "Error updating announcement !!" })
    }
}

const deleteAnnoucement = async (req, res) => {
    try {
        let id = req.params.annoucementId
        const status = await AnnouncementService.deleteAnnoucement(id)
        if (status) {
            return OK(res, "Announcement deleted successfully!")
            // return res.json({ status: true, data: "Announcement Deleted Successfully!!" })
        }
        else {
            throw "Error deleting announcement. Status returned false."
        }
    }
    catch (e) {
        log.error(e.toString())
        res.json({ status: false, data: "Error! While deleting announcement!" })
    }
}

const requiredAnnoucementDetails = async (req, res) => {
    try {
        let companies = await CompanyService.getAllCompany();
        return OK(res, companies)
        // return res.json({ status: true, data: companies })
    }
    catch (e) {
        log.error(e.toString())
        // console.log(e.toString());
        return ERROR(res, "Error! While fetching required details for announcements!")
        // res.json({ status: false, data: e.toString() })
    }
}

const addComment = async (req, res) => {
    try {
        // console.log("here in add comment")
        const { Comment_text } = req.body;

        const Announcement_ID = req.params.annoucementId
        let Comment_Date = new Date()
        const username = req.username;

        let comment = {
            Announcement_ID: Announcement_ID,
            Comment_text: Comment_text,
            Comment_Date: Comment_Date,
            Comment_Publisher: username == undefined ? "Admin" : username
        }

        console.log(comment)

        const commentStatus = await CommentService.createComment(comment);
        if (commentStatus) {
            return OK(res, "Comment added successfully!")
            // return res.json({ data: "Comment Created", status: true })
        }
        else {
            throw "Error from add comment announcement controller. Status returned false."
        }
    }
    catch (e) {
        log.error(e.toString())
        // console.log(e.toString());
        return ERROR(res, "Error! While adding comment!")
        // res.json({ status: false, data: e.toString() })
    }
}

const getAllComments = async (req, res) => {
    try {
        let id = req.params.annoucementId;
        let comments = await CommentService.getAllComments(id);
        if (comments) {
            return RESP(res, comments.length == 0 ? false : true, comments.length == 0 ? "No Comment data!" : comments)
            // return res.json({ status: comments.length == 0 ? false : true, data: comments.length == 0 ? "No Comment data!" : comments })
        }
        else {
            throw "Error in getAllComments. Status returned false.";
        }
    }
    catch (e) {
        log.error(e.toString())
        // console.log(e.toString());
        // res.json({ status: false, data: e.toString() })
        return ERROR(res, "Error! While fetching comments!")
    }
}

module.exports = {
    addAnnoucement,
    getAllAnnoucements,
    getAnnoucement,
    updateAnnoucement,
    deleteAnnoucement,
    requiredAnnoucementDetails,
    addComment,
    getAllComments
}