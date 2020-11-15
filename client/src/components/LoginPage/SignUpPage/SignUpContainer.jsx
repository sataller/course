import React from "react";
import {connect} from "react-redux";
import SignUp from "./SignUp";
import {Redirect} from "react-router-dom";
import {signUp} from "../../../redux/authReducer";

class SignUpContainer extends React.Component {
    render() {
        if (this.props.isAuth) {
            return <Redirect to="/users"/>
        }
        return (
            <div>
                <SignUp  message={this.props.message} signUp={this.props.signUp}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    message: state.authPage.message,
});

export default connect(mapStateToProps, {signUp})(SignUpContainer)
