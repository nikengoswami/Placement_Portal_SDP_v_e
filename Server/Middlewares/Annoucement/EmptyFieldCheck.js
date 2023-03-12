const EmptyFieldCheck = async function (req, res, next) {

    try {
        const { Company_ID, Date_of_Visit, Date_of_announcement,
            Eligible_Branches, Passed_out_year, Job_Role, Salary, Job_Location, Bond_Details, Other_Details, Job_Description_File, Registration_Deadline, Eligibility, IsOpen } = req.body;

        // console.log(req.body);

        if(!Company_ID) {
            throw "Company Name can not be empty!!"
        }
        else if (Date_of_Visit == 'null') {
            throw "Date of visit can not be empty!!";
        }
        else if (Date_of_announcement == 'null') {
            throw "Date of annoucement can not be empty!!";
        }
        else if(Passed_out_year == 'null') {
            throw "Passed out year can not be empty!!"
        }
        else if(!Eligible_Branches) {
            throw "Branch an not be empty!!"
        }
        else if(!Job_Role) {
            throw "Job role can not be empty!!"
        }
        else if(!Salary) {
            throw "Salary can not be empty!!"
        }
        else if(!Job_Location) {
            throw "Job location can not be empty!!"
        }
        else if(!Bond_Details) {
            throw "Bond details can not be empty!!"
        }
        else if(!Other_Details) {
            throw "Other details can not be empty!!"
        }
        else if(Registration_Deadline == 'null') {
            throw "Registration deadline can not be empty!!"
        }
        else if(!Eligibility) {
            throw "Eligibility can not be empty!!"
        }
        next()
    }
    catch (e) {
        console.log(e.toString())
        return res.json({ status: false, data: e.toString() })
    }
}


module.exports = EmptyFieldCheck;