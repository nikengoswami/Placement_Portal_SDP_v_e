const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const Company = db.companies

async function checkExists(id) {
    console.log(id)
    const companies = await Company.findAll({
        where: { Company_ID: id }
    })
    // console.log(companies)
    return companies.length > 0 ? true : false
}

const createCompany = async (companyData) => {
    let status = false;
    let message = ""
    try {
        const companies = await Company.findAll({
            where: { Company_name: companyData.Company_name }
        })
        if (companies.length > 0) {
            throw "Company already exists!"
        }
        await Company.create(companyData)
        status = true
        message = ""
        return { status, message }
    }
    catch (err) {
        log.error(err.toString())
        status = false
        message = "Company Already Exists!"
        return { status, message }
    }
}

const getCompany = async (id) => {
    try {
        const status = await checkExists(id)

        // console.log("Company service: ", id)
        // console.log("Status", status)
        if (!status) {
            throw "Error finding company detials"
        }
        else {
            // console.log("Here in else")
            let company = await Company.findOne({
                where: { Company_ID: id }
            })
            // console.log("CompanyService", company)
            return company
        }
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const getAllCompany = async () => {
    try {
        let companies = await Company.findAll({})
        return companies
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const updateCompany = async (data, id) => {
    try {
        const status = await checkExists(id)
        if (!status) {
            throw "Company doesn't exist"
        }
        else {
            const company = await Company.update(data, { where: { Company_ID: id } })
            return true
        }
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const deleteCompany = async (id) => {
    try {
        const status = await checkExists(id)
        if (!status) {
            throw "Error deleting company"
        }
        else {
            await Company.destroy({ where: { Company_ID: id } })
            return true
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

module.exports = {
    createCompany,
    getCompany,
    getAllCompany,
    updateCompany,
    deleteCompany
}