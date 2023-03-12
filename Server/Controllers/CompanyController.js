const db = require("../Models")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const Companies = db.companies
const CompanyService = require("../Services/CompanyService")
const StudentModel = require("../Models/StudentModel")

async function checkExists(id) {
    const companies = await Companies.findAll({ where: { companyId: id } })
    console.log(companies)
    return companies.length > 0 ? true : false
}

const addCompany = async (req, res) => {

    try {
        // Data must be in the format defined in models
        const data = req.body
        const { status, message } = await CompanyService.createCompany(data)
        if (status) {
            return res.json({ data: "Company added successfully!", status: true })
        }
        else {
            throw message
        }
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ data: "Error! While adding company!", status: false })
    }

}

const getCompany = async (req, res) => {

    try {
        console.log("Here")
        const companyId = req.params.id
        console.log("Company_id", companyId)
        let company = await CompanyService.getCompany(companyId)
        console.log(company)
        if (company) {
            return res.json({ status: company.length == 0 ? false : true, data: company.length == 0 ? "Company Not Found!" : company })
        }
        else {
            throw "Error in getCompany! Status returned false."
        }
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error! While fetching company!" })
    }

}

const getAllCompany = async (req, res) => {

    try {
        let companies = await CompanyService.getAllCompany()
        if (companies) {
            return res.json({ status: companies.length == 0 ? false : true, data: companies.length == 0 ? "No Student data!" : companies })
        }
        else {
            throw "Error in getAllCompany. Status returned false."
        }
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error! While fetching companies!" })
    }

}

const updateCompany = async (req, res) => {
    try {
        const id = req.params.id
        const company = await CompanyService.updateCompany(req.body, id)
        if (company) {
            return res.json({ status: true, data: "Company updated successfully!" })
        }
        else {
            return res.json({ status: false, data: "Error! While updating company data!" })
        }
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error! While updating company data!" })
    }
}

const deleteCompany = async (req, res) => {
    try {
        let id = req.params.id
        const status = await CompanyService.deleteCompany(id)
        if (status) {
            return res.json({ status: true, data: "Company deleted successfully!" })
        }
        else {
            throw "Error deleting company. Status returned false."
        }
    }
    catch (err) {
        if (err instanceof Error) {
            log.error(err.toString())
            return res.json({ status: false, data: "Error! While deleting company!" })
        }
        else {
            return res.json({ status: false, data: "Error! While deleting company!" })

        }
    }
}

module.exports = {
    addCompany,
    getAllCompany,
    getCompany,
    updateCompany,
    deleteCompany
}