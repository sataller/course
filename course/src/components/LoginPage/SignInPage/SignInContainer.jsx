import React from "react";
import SignIn from "./SignIn";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class SignInContainer extends React.Component {

    render() {
        if (this.props.isAuth) {
            return <Redirect to="/main"/>
        }
        return (
            <div>
                <SignIn setAuth={this.props.setAuth} setUsers={this.props.setUsers} signIn={this.props.signIn}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.usersPage.isAuth,
    authUserId: state.usersPage.authUserId,
    users: state.usersPage.users,
})

export default connect(mapStateToProps, {})(SignInContainer)
