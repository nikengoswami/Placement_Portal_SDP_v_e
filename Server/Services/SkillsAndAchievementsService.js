const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const SkillsAndAchievements = db.skills_and_achievements

async function checkExists(id) {
    const skillsandachievements = await SkillsAndAchievements.findAll({ 
        where: { id } 
    })
    return skillsandachievements.length > 0 ? true : false
}

const createSkillsAndAchievements = async (data) => {
    try {
        // console.log(data)
        await SkillsAndAchievements.create(data)
        return true
    } catch (error) {
        log.error(error.toString())
        return false   
    }
}

const getAllSkillsAndAchievements = async () => {
    try {
        let skillsandachievements = await SkillsAndAchievements.findAll({})
        return skillsandachievements
    } catch (error) {
        log.error(error.toString())
        return false   
    }
}

const getSkillsAndAchievements = async (id) => {
    try {
        // const status = await checkExists(id)
        // if(!status) {
        //     throw "Error finding Student Skills And Achievements details"
        // }
        // else {
            let skillsandachievements = await SkillsAndAchievements.findAll({ where: {Student_ID: id }})
            if(skillsandachievements)
            {
                return skillsandachievements
            }
            else
            {
                throw "Skill and achievements are not exist!"
            }

        // }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const updateSkillsAndAchievements = async (data, id) => {
    try {
        // const status = await checkExists(id)
        // if(!status) {
        //     throw "Student Skills And Achievements record doesn't exist"
        // }
        // else {
            let skillsandachievements = await SkillsAndAchievements.update(data, { where: { Student_ID: id } })
            return true
        // }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const deleteSkillsAndAchievements = async (id) => {
    try {
        const status = await checkExists(id)
        if(!status) {
            throw "Student Skills And Achievements record doesn't exist"
        }
        else {
            await SkillsAndAchievements.destroy({ where: { id } })
            return true
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const deleteAllSkillsAndAchievementsOfStudent = async(id) => {
    try {
        const temp = await SkillsAndAchievements.findAll({ where: { Student_ID: id } })
        const status = temp.length > 0 ? true : false
        if(status)
        {
            await SkillsAndAchievements.destroy({ where: { Student_ID: id } })
            return true
        }
        else
        {
            throw "Skills And Achievements record doesn't exist for the particular Student_ID"
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

module.exports = {
    createSkillsAndAchievements,
    getAllSkillsAndAchievements,
    getSkillsAndAchievements,
    updateSkillsAndAchievements,
    deleteSkillsAndAchievements,
    deleteAllSkillsAndAchievementsOfStudent
}