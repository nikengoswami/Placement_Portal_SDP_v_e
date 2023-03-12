import handleToast from "./HandleToast"
import RedirectHandler from "./RedirectHandler"
const responsePipelineHandler = function (data, seq_no = 0) {
    const executionSequence = [[RedirectHandler, handleToast], [handleToast]]
    executionSequence[seq_no].forEach((func) => {
        func(data)
    })
}
export default responsePipelineHandler
