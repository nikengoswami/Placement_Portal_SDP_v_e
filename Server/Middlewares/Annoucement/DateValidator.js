const DateValidator = async (req, res, next) => {
    try {
        console.log("yes in date validator")

        let date_of_visit = Date.parse(req.body.Date_of_Visit)
        let date_of_announcement = Date.parse(req.body.Date_of_announcement)
        let registration_deadline = Date.parse(req.body.Registration_Deadline)
        

        // console.log("Date of visit: ", date_of_visit);
        // console.log("Date of announcement: ", date_of_announcement);

        if(date_of_visit < date_of_announcement) {
            throw "Date of visit can not be lesser than date of announcement!!"
        }
        else if(registration_deadline < date_of_announcement) {
            throw "Registration deadline can not be lesser than date of announcement!!"
        }
        else if(date_of_visit < registration_deadline) {
            throw "Date of visit can not be lesser than date of registration!!"
        }

        next()
    }
    catch (e) {
        console.log(e.toString())
        return res.json({ status: false, data: e.toString() })
    }
}

module.exports = DateValidator