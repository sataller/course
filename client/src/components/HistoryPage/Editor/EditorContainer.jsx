import React from "react"
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import ChapterEditor from "./ChapterEditor";
import {updateChapter} from "../../../redux/historyReducer";
import Preloader from "../../common/Preloader/Preloader";

class EditorContainer extends React.Component {
 // componentDidMount() {
 //     this.props.setReadableHistory(this.props.match.params.historyId);
 // }

    render() {
        if (!this.props.readableHistory){
            return <Preloader/>
        }
        return (
            <div>
                <ChapterEditor updateChapter={this.props.updateChapter}/>
            </div>
        )

    }
}

let mapStateToProps = (state) => ({
    readableHistory: state.historyPage.history,
});

let WithRouterHistoryPageContainer = withRouter(EditorContainer)

export default connect(mapStateToProps, {
    updateChapter
})(WithRouterHistoryPageContainer)