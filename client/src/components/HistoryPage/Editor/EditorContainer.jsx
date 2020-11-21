import React from "react"
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import ChapterEditor from "./ChapterEditor";
import {setReadableHistory, updateChapter, updateHistory} from "../../../redux/historyReducer";
import Preloader from "../../common/Preloader/Preloader";

class EditorContainer extends React.Component {
    componentDidMount() {
        this.props.setReadableHistory(this.props.match.params.historyId);
    }

    render() {
        if (!this.props.readableHistory) {
            return <Preloader/>
        }
        return (
            <div>
                <ChapterEditor updateChapter={this.props.updateChapter}
                               updateHistory={this.props.updateHistory}
                               readableHistory={this.props.readableHistory}
                               historyId={this.props.match.params.historyId}
                               chapterId={this.props.match.params.chapterId}/>
            </div>
        )

    }
}

let mapStateToProps = (state) => ({
    readableHistory: state.historyPage.history,
});

let WithRouterHistoryPageContainer = withRouter(EditorContainer)

export default connect(mapStateToProps, {
    setReadableHistory,
    updateChapter, updateHistory
})(WithRouterHistoryPageContainer)