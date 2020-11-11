import React from "react"
import {signOut} from "../../redux/usersReducer";
import NavBar from "./Navbar";
import {connect} from "react-redux";

// import Tags from "../Tags/Tags";

class NavBarContainer extends React.Component {
    render() {
        return (
            <NavBar  authUser={this.props.authUser} isAuth={this.props.isAuth}
                     signOut={this.props.signOut}/>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.usersPage.isAuth,
    authUser: state.usersPage.authUser
});

export default connect(mapStateToProps, {signOut})(NavBarContainer);