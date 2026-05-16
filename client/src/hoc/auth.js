import { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../store/actions/user_action";

export default function authHoc(ComposedClass, reload) {
    class AuthenticationCheck extends Component {
        state = {
            loading: true
        }
        componentDidMount() {
            this.props.dispatch(auth()).then(response => {
                let user = this.props.user.auth;
                this.setState({ loading: false });
                if(!user) {
                    if(reload) {
                        this.props.history.push('/login');
                    }
                } else {
                    if(reload === false) {
                        this.props.history.push('/admin');
                    }
                }
            });
        }
        render() {
            if(this.state.loading) {
                return <div className="loader">Loading...</div>
            }
            return (
                <ComposedClass {...this.props} user={this.props.user}/>
            )
        }
    }
    function mapStateToProps(state) {
        return {
            user: state.user
        }
    }
    return connect(mapStateToProps)(AuthenticationCheck);
}