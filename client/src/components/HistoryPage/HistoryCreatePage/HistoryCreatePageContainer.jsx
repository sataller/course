import React from "react";
import {connect} from "react-redux";
import HistoryCreatePage from "./HistoryCreatePage";
import {createHistory, setUpdatedHistory} from "../../../redux/historyReducer";
import {Redirect} from "react-router-dom";

class HistoryCreatePageContainer extends React.Component {

    render() {
        if (this.props.updatedHistoryId) {
            return <Redirect to={`/history/${this.props.updatedHistoryId}`}/>
        }
        return (
            <>
                <HistoryCreatePage userName={this.props.authUser.name}
                                   userId={this.props.authUser.userId}
                                   setUpdatedHistory={this.props.setUpdatedHistory}
                                   createHistory={this.props.createHistory}/>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    authUser:state.authPage.authUser,
    updatedHistoryId:state.historyPage.updatedHistoryId,
});

export default connect(mapStateToProps, {
    createHistory, setUpdatedHistory
})(HistoryCreatePageContainer)