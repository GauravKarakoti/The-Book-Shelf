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
        return RouterLinks.common.map((item, i) => {
            if(props.user.auth && item.restricted) {
                return null;
            } else {
                return element(item, i);
            }
        });
    }

    const showAdminLinks = () => {
        return RouterLinks.admin.map((item, i) => {
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