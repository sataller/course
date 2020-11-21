import React from "react";
import {connect} from "react-redux";
import ToolBar from "./ToolBar";
import {updateUser} from "../../redux/userReducer";
import {signOut} from "../../redux/authReducer";

class ToolBarContainer extends React.Component {
    render() {
        return (
            <div>
                <ToolBar updateUser={this.props.updateUser}
                         updateUserStatus={this.props.updateUserStatus}
                         deleteUser={this.props.deleteUser} signOut={this.props.signOut}
                         authUser={this.props.authUser}
                         selectedUsersId={this.props.selectedUsersId}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    selectedUsersId: state.userPage.selectedUsersId,
    authUser: state.authPage.authUser,

})

export default connect(mapStateToProps, {updateUser, signOut})(ToolBarContainer)



