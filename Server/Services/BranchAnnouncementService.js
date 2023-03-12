const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const BranchAnnouncement = db.BranchAnnouncement




const addBranchToAnnouncement = async (announcementId, branchName) => {
    try {
        let branchesData = await getBranchesOfAnnouncement(announcementId)
        branchesData = JSON.parse(JSON.stringify(branchesData))
        for (let i = 0; i < branchesData.length; i++) {
            if (branchesData[i]["BranchName"] == branchName) {
                return true
            }
        }

        const payLoad = { AnnouncementId: announcementId, BranchName: branchName }

        const status = await BranchAnnouncement.create(payLoad)
        if (status) {
            return true
        }
        else {
            throw "Error in create BranchAnnouncementService"
        }
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const deleteBranchesOfAnnouncement = async (AnnouncementId) => {
    try {
        await BranchAnnouncement.destroy({
            where: {
                AnnouncementId
            }
        })
        return true
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const getBranchesOfAnnouncement = async (AnnouncementId) => {
    try {
        const allBranches = await BranchAnnouncement.findAll({ where: { AnnouncementId } })
        console.log(allBranches)
        return allBranches
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

module.exports = {
    addBranchToAnnouncement,
    getBranchesOfAnnouncement,
    deleteBranchesOfAnnouncement
}