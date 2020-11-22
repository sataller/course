import React from "react";
import styles from "./userPage.module.css"
import UserPage from "./UserPage";
import {connect} from "react-redux";
import ToolBarContainer from "../ToolBar/ToolBarContainer";
import {getAuthUserData, signOut} from "../../redux/authReducer";
import {setUsers, deleteUser, updateUser} from "../../redux/userReducer";
import {Redirect} from "react-router-dom";

class AdminPageContainer extends React.Component {
componentDidMount() {
    this.props.getAuthUserData();
    this.props.setUsers();
};

    render() {
        if (!this.props.isAuth){
            return <Redirect to={"/auth/login"}/>
        }
        return (
            <div className={styles.table}>
                <ToolBarContainer/>
                <UserPage authUser={this.props.authUser} setSelect={this.props.setSelect}
                          updateUser={this.props.updateUser} users={this.props.users}
                          deleteUser={this.props.deleteUser} signOut={this.props.signOut}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    users: state.userPage.users,
    isAuth: state.authPage.isAuth,
    authUser: state.authPage.authUser,
});

export default connect(mapStateToProps, {getAuthUserData, setUsers, signOut, updateUser, deleteUser})(AdminPageContainer)
