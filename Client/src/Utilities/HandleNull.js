const handleNull = function (data) {
    if (data == "" || data == undefined || data == null) {
        return "Not Defined!"
    }
    else {
        return data
    }
}
export default handleNull