import React from "react";
import {connect} from "react-redux";
import ChapterCreatePage from "./ChapterCreatePage";
import {createChapter} from "../../../redux/historyReducer";
import {Redirect, withRouter} from "react-router-dom";

class ChapterCreatePageContainer extends React.Component {
    render() {
        if (this.props.updatedHistoryId) {
            return <Redirect to={`/history/${this.props.updatedHistoryId}`}/>
        }
        return (
            <>
                <ChapterCreatePage historyId={this.props.match.params.historyId}
                                   createChapter={this.props.createChapter}/>
            </>
        )
    }
}

const mapDispatchToProps = (state) => ({
    updatedHistoryId: state.historyPage.updatedHistoryId,
});
let WithRouterHistoryPageContainer = withRouter(ChapterCreatePageContainer);

export default connect(mapDispatchToProps, {
    createChapter
})(WithRouterHistoryPageContainer)