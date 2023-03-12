const ConvertToLPA = function (data) {
    // if (data == 0 || data == undefined || data == null) {
    //     return 0 + " LPA"
    // }
    // else {
        data = data / 100000
        data = data.toFixed(2)
        return data + " LPA"
    // }
}
export default ConvertToLPA