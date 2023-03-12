import { useHistory } from "react-router"
const RedirectHandler = function (props) {
    const history = useHistory()
    const data = props.data
    if (data["redirect"]) {
        history.push(data["redirectUrl"])
    }
}
export default RedirectHandler