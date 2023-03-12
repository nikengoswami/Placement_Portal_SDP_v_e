const db = require("../Models")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const SkillsAndAchievements = db.skills_and_achievements
const SkillsAndAchievementsService = require("../Services/SkillsAndAchievementsService")

async function checkExists(id) {
    const skillsandachievements = await SkillsAndAchievements.findAll({ where: { id } })
    return skillsandachievements.length > 0 ? true : false
}

const createSkillsAndAchievements = async (req, res) => {
    try {
        req.body.Student_ID = req.userId
        const data = req.body
        console.log(data)
        if (req.emptyField) {
            throw req.empty_arr[0] + " cannot be empty"
        }
        const status = await SkillsAndAchievementsService.createSkillsAndAchievements(data)
        console.log(status)
        if (status) {
            return res.json({ data: "Student Skills And Achievements Record created", status: true })
        }
        else {
            throw "Error from createSkillsAndAchievements controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false })
    }
}

const getAllSkillsAndAchievements = async (req, res) => {
    try {
        let skillsandachievements = await SkillsAndAchievementsService.getAllSkillsAndAchievements()
        if (skillsandachievements) {
            return res.json({ status: skillsandachievements.length == 0 ? false : true, data: skillsandachievements.length == 0 ? "No Student Skills And Achievements Record found" : skillsandachievements })
        }
        else {
            throw "Error from getAllSkillsAndAchievements controller"
        }

    } catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false })
    }
}

const getSkillsAndAchievements = async (req, res) => {
    try {
        // const id = req.params.id
        const id = req.userId
        let skillsandachievements = await SkillsAndAchievementsService.getSkillsAndAchievements(id)
        if (skillsandachievements) {
            return res.json({ status: skillsandachievements.length == 0 ? false : true, data: skillsandachievements.length == 0 ? "No Student Skills And Achievements Record found" : skillsandachievements })
        }
        else {
            throw "Error from getSkillsAndAchievements controller"
        }

    } catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false })
    }
}

const getSkillsAndAchievementsInAdmin = async (req, res) => {

    try {
        const id = req.params.id
        // const id = req.userId
        let skillsandachievements = await SkillsAndAchievementsService.getSkillsAndAchievements(id)
        if (skillsandachievements) {
            return res.json({ status: skillsandachievements.length == 0 ? false : true, data: skillsandachievements.length == 0 ? "No Student Skills And Achievements Record found" : skillsandachievements })
        }
        else {
            throw "Error from getSkillsAndAchievements controller"
        }
    }
    catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false })
    }
}

const updateSkillsAndAchievements = async (req, res) => {
    try {
        // const id = req.params.id
        const id = req.userId
        console.log("Line 72", id)
        const skillsandachievements = await SkillsAndAchievementsService.updateSkillsAndAchievements(req.body, id)
        if (skillsandachievements) {
            return res.json({ status: true, data: "Student Skills And Achievements Record Updated" })
        }
        else {
            throw "Error from updateSkillsAndAchievements controller"
        }

    } catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false })
    }
}

const deleteSkillsAndAchievements = async (req, res) => {
    try {
        const id = req.params.id
        const status = await SkillsAndAchievementsService.deleteSkillsAndAchievements(id)
        if (status) {
            return res.json({ status: true, data: "Student Skills And Achievements Record Deleted Successfully!!!" })
        }
        else {
            throw "Error from deleteSkillsAndAchievements controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false })
    }
}

module.exports = {
    createSkillsAndAchievements,
    getAllSkillsAndAchievements,
    getSkillsAndAchievements,
    updateSkillsAndAchievements,
    deleteSkillsAndAchievements,
    getSkillsAndAchievementsInAdmin
}