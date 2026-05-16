import { useEffect } from "react";
import { logoutUser } from "../../store/actions/user_action";

const { useSelector, useDispatch } = require("react-redux")

const Logout = (props) => {
    const logout = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logoutUser());
    },[dispatch]);
    useEffect(() => {
        if(logout.auth === null) {
            setTimeout(() => {
                props.history.push('/')
            }, 2000);
        }
    },[logout, props]);
    return (
        <div className="logout_container">
            <h1>
                Sorry to see you go :&39;
            </h1>
        </div>
    )
}
export default Logout;