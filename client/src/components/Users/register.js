import { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/user_action";

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Required!!'),
    lastname: Yup.string().required('Required!!'),
    password: Yup.string()
        .min(6, 'Too Short!!')
        .required('Required!!'),
    email: Yup.string()
        .email('Invalid Email :(')
        .required('Required!!')
});

class Register extends Component {
    state = {
        success: false,
        validation: false
    }

    componentDidUpdate() {
        if(this.state.success) {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div className="container form_container">
                <h1>Register</h1>
                <hr/>
                <h4>Create an account:</h4>
                <Formik
                    initialValues={{name: '', lastname: '', email: '', password: ''}}
                    validationSchema={RegisterSchema}
                    onSubmit={values => {
                        this.props.dispatch(registerUser(values)).then(response => {
                            if(response.payload && response.payload.success) {
                                this.setState({ success: true });
                            } else {
                                this.setState({ validation: true });
                            }
                        })
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="six columns">
                                    <input
                                        type="text"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        placeholder="First Name"
                                        className="u-full-width"
                                    />
                                    { errors.name && touched.name ? <div className="error_label">{errors.name}</div> : null }
                                </div>
                                <div className="six columns">
                                    <input
                                        type="text"
                                        name="lastname"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastname}
                                        placeholder="Last Name"
                                        className="u-full-width"
                                    />
                                    { errors.lastname && touched.lastname ? <div className="error_label">{errors.lastname}</div> : null }
                                </div>
                            </div>
                            <div className="row">
                                <div className="twelve columns">
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        placeholder="Enter your email"
                                        className="u-full-width"
                                    />
                                    { errors.email && touched.email ? <div className="error_label">{errors.email}</div> : null }
                                </div>
                            </div>
                            <div className="row">
                                <div className="twelve columns">
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        placeholder="Enter your password"
                                        className="u-full-width"
                                    />
                                    { errors.password && touched.password ? <div className="error_label">{errors.password}</div> : null }
                                </div>
                            </div>
                            <button type="submit">Register</button>
                            <br/>
                            { this.state.validation ? <div className="error_label">Registration Failed. Please try again.</div> : null }
                        </form>
                    )}
                </Formik>
                <div 
                    style={{
                        cursor: "pointer"
                    }}
                    onClick={() => this.props.history.push('/login')}
                >
                    Already have an account?
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Register);