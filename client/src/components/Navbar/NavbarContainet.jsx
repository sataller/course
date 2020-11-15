import React from "react"
import {signOut} from "../../redux/authReducer";
import NavBar from "./Navbar";
import {connect} from "react-redux";
import {updateUser} from "../../redux/userReducer";

// import Tags from "../Tags/Tags";

class NavBarContainer extends React.Component {
    render() {
        return (
            <NavBar  authUser={this.props.authUser} isAuth={this.props.isAuth}
                     signOut={this.props.signOut} updateUser={this.props.updateUser}/>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.authPage.isAuth,
    authUser: state.authPage.authUser
});

export default connect(mapStateToProps, {signOut, updateUser})(NavBarContainer);