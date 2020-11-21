import React from "react"
import HistoryPage from "./HistoryPage";
import {connect} from "react-redux";
import {
    deleteChapter, deleteHistory, setDeletedHistory,
    setReadableHistory, setUpdatedHistory,
    setUserHistories, updateChapter,
    updateHistory,
    updateHistoryAuthor
} from "../../redux/historyReducer";
import {Redirect, withRouter} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";

class HistoryPageContainer extends React.Component {
    componentDidMount() {
        this.props.setReadableHistory(this.props.match.params.historyId);
        this.props.setUpdatedHistory(null);
    };

    render() {
        if (this.props.deletedHistoryId){
            this.props.setDeletedHistory(null);
           return  <Redirect to={`/profile/${this.props.authUser.id}`}/>
        }
         if (!this.props.readableHistory) {
            return <Preloader/>
        }
        return (
            <div>
                <HistoryPage authUser={this.props.authUser}
                             updateHistory={this.props.updateHistory}
                             updateChapter={this.props.updateChapter}
                             deleteChapter={this.props.deleteChapter}
                             deleteHistory={this.props.deleteHistory}
                             history={this.props.readableHistory}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    authUser: state.authPage.authUser,
    userProfile: state.userPage.userProfile,
    readableHistory: state.historyPage.history,
    updatedHistoryId: state.historyPage.updatedHistoryId,
    deletedHistoryId: state.historyPage.deletedHistoryId,
});

let WithRouterHistoryPageContainer = withRouter(HistoryPageContainer);

export default connect(mapStateToProps, {
    updateHistory, updateHistoryAuthor,
    setUserHistories, setReadableHistory,
    updateChapter, setUpdatedHistory,
    setDeletedHistory, deleteChapter,
    deleteHistory,
})(WithRouterHistoryPageContainer)