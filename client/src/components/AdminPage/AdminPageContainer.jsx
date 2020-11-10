import React from "react";
import styles from "./userPage.module.css"
import UserPage from "./UserPage";
import {connect} from "react-redux";
import withAuthRedirect from "../HOC/withAuthRedirect";
import ToolBarContainer from "../ToolBar/ToolBarContainer";
import {deleteUser, selectOll, setSelect, setUsers} from "../../redux/adminReducer";

class AdminPageContainer extends React.Component {
    render() {

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
    isAuth: state.adminPage.isAuth,
    selectedOll: state.adminPage.selectedOll,
})

// let AuthRedirectComponent = withAuthRedirect(AdminPageContainer)

export default connect(mapStateToProps, {
    setUsers,
    selectOll,
    deleteUser,
    setSelect,
})(AdminPageContainer)
// })(AuthRedirectComponent)