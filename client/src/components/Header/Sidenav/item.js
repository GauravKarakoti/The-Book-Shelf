import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RouterLinks } from "../../../utils/routerLinks";

const Items = (props) => {
    const element = (item, i) => (
        <div key={i} className="navItem">
            <Link
                to={item.link}
                onClick={props.onHideNav}
            >
                <FontAwesome name={item.icon}/>
                {item.text}
            </Link>
        </div>
    )
    const showLinks = () => {
        RouterLinks.common.map((item, i) => {
            if(props.user.auth && item.restricted) {
                return null;
            } else {
                return element(item, i);
            }
        });
    }
    const showAdminLinks = () => {
        RouterLinks.admin.map((item, i) => {
            return element(item, i);
        });
    }
    return (
        <div>
            {showLinks()}
            { props.user.auth ? 
                <div>
                    <div className="nav_split">
                        Admin Options
                    </div>
                    {showAdminLinks()}
                </div> : null
            }
        </div>
    )
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Items);

{/* <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
                <Link to="/" onClick={props.onHideNav} style={{ color: "#ffffff", textDecoration: "none" }}>
                    Home
                </Link>
                <Link to="/books" onClick={props.onHideNav} style={{ color: "#ffffff", textDecoration: "none" }}>
                    My Books
                </Link>
                <Link to="/profile" onClick={props.onHideNav} style={{ color: "#ffffff", textDecoration: "none" }}>
                    Profile
                </Link>
                <Link to="/login" onClick={props.onHideNav} style={{ color: "#ffffff", textDecoration: "none" }}>
                    Login
                </Link>
            </div> */}