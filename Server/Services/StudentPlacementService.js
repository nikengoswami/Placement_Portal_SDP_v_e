const logger = require("serverloggerjs/logger")
const { sequelize } = require("../Models/index")
const Sequelize = require("sequelize")
const log = new logger(true)
const db = require("../Models/index")
const StudentPlacement = db.student_placements
const Company = db.companies
const CompanyService = require("./CompanyService")
const StudentService = require("./StudentService")


async function isFinalPlacementPresent(studentId) {
    try {
        const allPlacements = await getStudentPlacement(studentId)
        if (allPlacements) {
            for (let i = 0; i < allPlacements.length; i++) {
                let obj = allPlacements[i]
                if (obj["IsFinal"] == 1) {
                    obj["IsFinal"] = 0
                    // update to 0 and break return true
                    await updateStudentPlacement(obj, obj["id"])
                    return true
                }
            }
            return true
        }
        else {
            return true
        }
    }
    catch (err) {
        log.error("")
    }
}

async function isFirstPlacement(studentId) {
    try {
        const studentplacement = await StudentPlacement.findAll({ where: { Student_ID: studentId } })

        return studentplacement.length == 0 ? true : false
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

async function checkExists(id) {
    const studentplacement = await StudentPlacement.findAll({ where: { id } })
    return studentplacement.length > 0 ? true : false
}


const checkDuplicate = async (studentId, companyId, Designation) => {
    try {
        let status = await StudentPlacement.findAll({
            where: {
                Company_ID
                    : companyId, Student_ID: studentId, Designation: Designation
            }
        })
        status = JSON.parse(JSON.stringify(status))
        console.log("Status")
        console.log(status)
        if (status.length == 0) {
            console.log("Length is 0")
            return false
        }
        else {
            return true
        }
    }
    catch (err) {
        log.error(err)
        return false
    }
}


const createStudentPlacement = async (studentplacementdata, fromFile = false) => {
    console.log("Create service callsed")
    try {
        const status = await isFirstPlacement(studentplacementdata.Student_ID)
        if (status) {
            studentplacementdata["IsFinal"] = true
        }
        else {
            if (studentplacementdata["IsFinal"] == true) {

                await isFinalPlacementPresent(studentplacementdata.Student_ID)
            }

        }
        const student_details = await StudentService.getOneStudent(studentplacementdata.Student_ID)

        if (fromFile) {
            // console.log("from line 72", studentplacementdata)
            if (studentplacementdata["Company_ID"] == '' && studentplacementdata["Designation"] == '') {
                return "SKIP"
                // if (studentplacementdata["Company_ID"] == '') {
                //     return "Company name cannot be empty for record: " + studentplacementdata["Student_ID"]
                // }
            }
            studentplacementdata["Offer_Letter"] = ""
            // console.log("Company ID")
            // let company = Company.findOne({ where: [Sequelize.where(Sequelize.fn("lower", "Company_name"), studentplacementdata["Company_ID"].toLowerCase())] })
            let [res1, res2] = await sequelize.query("SELECT Company_ID FROM Companies WHERE LOWER(Company_name)='" + studentplacementdata["Company_ID"].toLowerCase() + "'")
            console.log("Break1")
            // console.log("Here in company")
            let result = (JSON.parse(JSON.stringify(res2)))
            if (result.length == 0) {
                return `Company name ${studentplacementdata["Company_ID"]
                    }  for record ${studentplacementdata["Student_ID"]}  does not exists`
            }
            if (res2[0]["Company_ID"] == 0) {
                // console.log("Here on 0")
                if (studentplacementdata["Company_ID"] == "" || studentplacementdata["Company_ID"] == undefined || studentplacementdata["Company_ID"] == null) {
                    return "Company name for record:" + studentplacementdata["Student_ID"] + " cannot be empty"
                }
                return "No company named " + studentplacementdata["Company_ID"] + " found for record" + studentplacementdata["Student_ID"]
            }
            studentplacementdata["Company_ID"] = res2[0]["Company_ID"]
        }
        studentplacementdata["Passed_out_year"] = student_details.Passed_out_year


        console.log(studentplacementdata)

        const status2 = await checkDuplicate(studentplacementdata["Student_ID"], studentplacementdata["Company_ID"], studentplacementdata["Designation"])
        if (!status2) {
            console.log("Creating data")
            await StudentPlacement.create(studentplacementdata)
        }
        else {
        }
        return "OK"
    } catch (error) {
        console.log(JSON.parse(JSON.stringify(studentplacementdata)))
        log.error(error.toString())
        return "Oops some error occured while addin placement"
    }
}

const getStudentPlacement = async (id) => {
    try {
        let studentplacement = await StudentPlacement.findAll({
            where: { Student_ID: id }
        })
        studentplacement = JSON.parse(JSON.stringify(studentplacement))
        for (let i = 0; i < studentplacement.length; i++) {
            studentplacement[i]["Company_details"] = await CompanyService.getCompany(studentplacement[i]["Company_ID"])
            console.log("Here")
        }
        return studentplacement

    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const getAllStudentPlacement = async () => {
    try {
        let studentplacements = await StudentPlacement.findAll({})
        return studentplacements
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const updateStudentPlacement = async (studentplacementdata, id) => {
    try {
        const status = await checkExists(id)
        if (!status) {
            throw "Student Placement record doesn't exist"
        }
        else {
            if (studentplacementdata["IsFinal"] == 1) {
                const status1 = await isFinalPlacementPresent(studentplacementdata.Student_ID)
                if (status1) {

                    const studentplacement = await StudentPlacement.update(studentplacementdata, { where: { id } })
                    console.log("here from service");
                    return true
                }
            }
            else {
                const studentplacement = await StudentPlacement.update(studentplacementdata, { where: { id } })
                console.log("here from service");
                return true
            }
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const deleteStudentPlacement = async (id) => {
    try {
        const status = await checkExists(id)
        if (!status) {
            throw "Student Placement record doesn't exist"
        }
        else {
            await StudentPlacement.destroy({ where: { id } })
            return true
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const deleteAllPlacementOfStudent = async (id) => {
    try {
        const temp = await StudentPlacement.findAll({ where: { Student_ID: id } })
        const status = temp.length > 0 ? true : false
        if (!status) {
            throw "Placement record doesn't exist for the particular Student_ID"
        }
        else {
            await StudentPlacement.destroy({ where: { Student_ID: id } })
            return true
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

module.exports = {
    createStudentPlacement,
    getStudentPlacement,
    getAllStudentPlacement,
    updateStudentPlacement,
    deleteStudentPlacement,
    deleteAllPlacementOfStudent
}