import React from "react";
import {connect} from "react-redux";
import Comments from "./Comments";
import {addNewComment, sendNewComment} from "../../../redux/historyReducer";
import socket from "../../common/socket.io/socket";

class CommentsContainer extends React.Component {
    componentDidMount() {
        socket.on("NEW COMMENT", (data) => {
            this.props.addNewComment(data);
        });
    }

    render() {
        return (
            <div>
                <Comments sendNewComment={this.props.sendNewComment}
                          readableHistory={this.props.readableHistory}
                          authUser={this.props.authUser}
                          comments={this.props.comments}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    readableHistory: state.historyPage.history,
    comments: state.historyPage.comments,
    authUser: state.authPage.authUser,

});

export default connect(mapStateToProps, {
    sendNewComment, addNewComment
})(CommentsContainer)