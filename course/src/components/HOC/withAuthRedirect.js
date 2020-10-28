import React from "react"
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.usersPage.isAuth,
})

let withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to="/auth/login"/>
            return < Component {...this.props}/>
        }
    }

    let ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectAuthRedirectComponent

}

export default withAuthRedirect