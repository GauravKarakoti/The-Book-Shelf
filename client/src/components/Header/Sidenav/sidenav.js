import SideNav from "react-simple-sidenav";
import { Link } from "react-router-dom";
import Items from "./item";

const MainNav = (props) => {
    return (
        <SideNav
            showNav={props.showNav}
            onHideNav={props.onHideNav}
            navStyle={{
                background: "#242424",
                maxWidth: "220px",
                color: "#ffffff"
            }}
        >
            <Items
                onHideNav={props.onHideNav}
            />
        </SideNav>
    );
};

export default MainNav;