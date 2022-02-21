import bindActionCreators from "react-redux/lib/utils/bindActionCreators";
import {useDispatch} from "react-redux";
import ActionCreators from "../store/actions-creators"

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}
