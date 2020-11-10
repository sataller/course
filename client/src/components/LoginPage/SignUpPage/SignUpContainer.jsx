import React from "react";
import {connect} from "react-redux";
import SignUp from "./SignUp";
import {Redirect} from "react-router-dom";

class SignUpContainer extends React.Component {
    render() {
        if (this.props.isAuth) {
            return <Redirect to="/users"/>
        }
        return (
            <div>
                <SignUp setUsers={this.props.setUsers} signUp={this.props.signUp} setAuth={this.props.setAuth}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {})(SignUpContainer)
