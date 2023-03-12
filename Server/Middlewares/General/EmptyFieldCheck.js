const EmptyFieldCheck = async function(req, res, next) {
    try {
        const keys = Object.keys(req.body);

        console.log(keys)

        const empty_arr = [];

        keys.forEach((key, index) => {
            // console.log(`${key}: ${courses[key]}`);
            if(req.body[key] == "") {
                empty_arr.push(key);
            }
        });

        // for(var i in Object.keys(req.body)) {
        //     console.log(i);
        //     if((req.body[i]) == "") {
        //         return res.json({status: false, data: `field ${i} can not be empty!!`})
        //     }
        // }
        
        req.empty_arr = empty_arr;
        empty_arr.length > 0 ? req.emptyField = true : req.emptyField = false

        

        next();
    }
    catch(e) {
        console.log(e.toString())
        res.json({ status: false, data: "Error processing your data!!" })
    }
}

module.exports = EmptyFieldCheck;

