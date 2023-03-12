const SalaryVerifier = async function(req, res, next) {
    try {
        let salary = req.body.Salary;
        let isNum = /^\d+$/.test(salary);

        if(!isNum) {
            throw "Salary should contain only digits!!";
        }
        next()
    }
    catch (e) {
        console.log(e.toString())
        return res.json({ status: false, data: e.toString() })
    }
}

module.exports = SalaryVerifier