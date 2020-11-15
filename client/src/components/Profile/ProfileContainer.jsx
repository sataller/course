import React from "react"
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUser} from "../../redux/userReducer";
import {setUserHistories} from "../../redux/historyReducer";
import {withRouter} from "react-router-dom";

class ProfileContainer extends React.Component {

    componentDidMount() {
        this.props.setUserHistories(this.props.match.params.userId);
        this.props.getUser(this.props.match.params.userId);

    };

    render() {
        return (
            <Profile userProfile={this.props.userProfile} histories={this.props.histories}/>
        )

    }
}

let mapStateToProps = (state) => ({
    userProfile: state.userPage.userProfile,
    histories: state.historyPage.histories,
});
let WithRouterProfileContainer = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getUser, setUserHistories})(WithRouterProfileContainer)