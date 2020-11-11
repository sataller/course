import React from "react";
import styles from "./userPage.module.css"
import UserPage from "./UserPage";
import {connect} from "react-redux";
import withAuthRedirect from "../HOC/withAuthRedirect";
import ToolBarContainer from "../ToolBar/ToolBarContainer";

class AdminPageContainer extends React.Component {
    render() {
        if (this.props.authUser.role !== "admin"){
            return (
                <></>
            )
        }
        return (
            <div className={styles.table}>
                <ToolBarContainer/>
                <UserPage users={this.props.users}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    users: state.adminPage.users,
    isAuth: state.usersPage.isAuth,
    authUser: state.usersPage.authUser,
    selectedOll: state.adminPage.selectedOll,
});

let AuthRedirectComponent = withAuthRedirect(AdminPageContainer);

export default connect(mapStateToProps, {

// })(AdminPageContainer)
})(AuthRedirectComponent);