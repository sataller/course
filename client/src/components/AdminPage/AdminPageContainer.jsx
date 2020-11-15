import React from "react";
import styles from "./userPage.module.css"
import UserPage from "./UserPage";
import {connect} from "react-redux";
import ToolBarContainer from "../ToolBar/ToolBarContainer";
import {getAuthUserData} from "../../redux/authReducer";
import {setUsers, deleteUser, updateUser} from "../../redux/userReducer";

class AdminPageContainer extends React.Component {
componentDidMount() {
    this.props.getAuthUserData();
    this.props.setUsers();
};

    render() {
        return (
            <div className={styles.table}>
                <ToolBarContainer/>
                <UserPage authUser={this.props.authUser} setSelect={this.props.setSelect}
                          updateUser={this.props.updateUser} users={this.props.users}
                          deleteUser={this.props.deleteUser}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    users: state.userPage.users,
    isAuth: state.authPage.isAuth,
    authUser: state.authPage.authUser,
});

export default connect(mapStateToProps, {getAuthUserData, setUsers, updateUser, deleteUser})(AdminPageContainer)
