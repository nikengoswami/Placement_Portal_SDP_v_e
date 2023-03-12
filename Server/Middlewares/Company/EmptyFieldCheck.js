const EmptyFieldCheck = function (req, res, next) {
    console.log("From Here", req.body)
    try {
        if (req.body.Company_name == "") {
            throw "Company name cannot be empty"
        }
        else if (req.body.Contact_person_1_designation == "") {
            throw "Person 1's designation cannot be empty"
        }
        else if (req.body.Contact_person_1_name == "") {
            throw "Person 1's name cannot be empty"
        }
        else if (req.body.Contact_person_1_Mobile == "") {
            throw "Person 1's mobile number cannot be empty"
        }
        else if (req.body.Contact_person_1_email_ID == "") {
            throw "Person 1's Email ID cannot be empty"
        }
        else if (req.body.Contact_person_2_designation == "") {
            throw "Person 2's designation cannot be empty"
        }


        else if (req.body.Contact_person_2_name == "") {
            throw "Person 2's name cannot be empty"
        }
        else if (req.body.Contact_person_2_Mobile == "") {
            throw "Person 2's mobile number cannot be empty"
        }

        else if (req.body.Contact_person_2_email_ID == "") {
            throw "Person 2's Email ID cannot be empty"
        }
        else if (req.body.Contact_person_3_name == "") {
            throw "Person 3's name cannot be empty"
        }
        else if (req.body.Contact_person_3_designation == "") {
            throw "Person 3's designation cannot be empty"
        }
        else if (req.body.Contact_person_3_Mobile == "") {
            throw "Person 3's mobile number cannot be empty"
        }

        else if (req.body.Contact_person_3_email_ID == "") {
            throw "Person 3's Email ID cannot be empty"
        }
        else if (req.body.Company_address == "") {
            throw "Company's address cannot be empty"
        }
        else if (req.body.City == "") {
            throw "City cannot be empty"
        }
        else if (req.body.State == "") {
            throw "State cannot be empty"
        }
        else if (req.body.Remarks == "") {
            throw "Remarks cannot be empty"
        }
        else if (req.body.Company_offer_type == "") {
            throw "Offer type cannot be empty"
        }


    }
    catch (e) {
        console.log(e.toString())
        return res.json({ status: false, data: e.toString() })
    }
    next()
}

module.exports = EmptyFieldCheck