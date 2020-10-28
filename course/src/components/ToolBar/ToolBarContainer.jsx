import React from "react";
import {connect} from "react-redux";
import ToolBar from "./ToolBar";
import {deleteUser, signOut, updateUserStatus} from "../../redux/adminReducer";

class ToolBarContainer extends React.Component {
    render() {
        return (
            <div>
                <ToolBar updateUserStatus={this.props.updateUserStatus}
                         updateUserStatus={this.props.updateUserStatus}
                         deleteUser={this.props.deleteUser} signOut={this.props.signOut}
                         selectedUsersId={this.props.selectedUsersId}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    selectedUsersId: state.adminPage.selectedUsersId,

})

export default connect(mapStateToProps, {updateUserStatus, signOut, deleteUser})(ToolBarContainer)



