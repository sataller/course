import React from "react";
import SignIn from "./SignIn";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {signIn} from "../../../redux/authReducer";

class SignInContainer extends React.Component {

    render() {
        if (this.props.isAuth) {
            return <Redirect to="/main"/>
        }
        return (
            <div>
                <SignIn signIn={this.props.signIn}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.authPage.isAuth,
    authUser: state.authPage.authUser,
    users: state.authPage.users,
})

export default connect(mapStateToProps, {signIn})(SignInContainer)
