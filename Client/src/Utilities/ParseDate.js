function getTime(date) {
    return date.getHours() + ":" + date.getMinutes()
}

const ParseDate = function (date, time_required = false) {
    // console.log(date)
    var new_date = new Date(date)
    // console.log(new_date.getDate() + "/" + new_date.getMonth() + "/" + new_date.getFullYear())
    try {
        var return_date = ""
        var parse_date = date.split("T");
        var date_part = parse_date[0]
        var time_part = parse_date[1]
        var date_splitted = date_part.split("-")
        return_date += new_date.getDate() + "/" + (new_date.getMonth() + 1) + "/" + new_date.getFullYear()
        if (time_required) {
            var time_splitted = time_part.split(":")
            return_date += " " + new_date.getHours() + ":" + new_date.getMinutes()
        }

        return return_date
    }
    catch (e) {
        console.log(e.toString());

    }

}

const getYear = function (date) {
    try {
        var parse_date = date.split("T")[0].split("-");
        return parse_date[0]

    }
    catch (e) {
        console.log(e.toString())
    }
}

const dateWithDay = function (date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var new_date = new Date(date)
    // console.log(days[new_date.getDay()] + ", " + months[new_date.getMonth()] + " " + new_date.getDate() + " " + new_date.getFullYear() + " " + new_date.getHours() + ":" + new_date.getMinutes())
    return days[new_date.getDay()] + ", " + months[new_date.getMonth()] + " " + new_date.getDate() + " " + new_date.getFullYear() + " " + new_date.getHours() + ":" + new_date.getMinutes()
}

module.exports = { ParseDate, getYear, dateWithDay }