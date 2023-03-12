const handleToast = function (params) {

    const toast = params.HandleToast.toast
    const data = params.data
    const flag = params.HandleToast.flag
    const customMessage = params.HandleToast.customMessage
    let message = "not defined"
    if (!flag) {
        message = data["data"]
    }
    else {
        message = customMessage
    }
    if (data["status"]) {
        toast.success(message)
    }
    else {
        toast.error(message)
    }
}
export default handleToast