import React from "react"
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUser, updateUser} from "../../redux/userReducer";
import {setUserHistories, updateHistory, updateHistoryAuthor} from "../../redux/historyReducer";
import {withRouter} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";

class ProfileContainer extends React.Component {

    componentDidMount() {
        this.props.setUserHistories(this.props.match.params.userId);
        this.props.getUser(this.props.match.params.userId);

    };

    render() {
        if (!this.props.userProfile) {
            return <Preloader/>
        }
        return (
            <div>
                <Profile userProfile={this.props.userProfile} histories={this.props.histories}
                         updateUser={this.props.updateUser} authUser={this.props.authUser}
                         updateHistoryAuthor={this.props.updateHistoryAuthor}
                         updateHistory={this.props.updateHistory}/>
            </div>
        )

    }
}

let mapStateToProps = (state) => ({
    authUser: state.authPage.authUser,
    userProfile: state.userPage.userProfile,
    histories: state.historyPage.histories,
});
let WithRouterProfileContainer = withRouter(ProfileContainer)

export default connect(mapStateToProps, {
    getUser, updateUser,
    updateHistory, updateHistoryAuthor,
    setUserHistories
})(WithRouterProfileContainer)