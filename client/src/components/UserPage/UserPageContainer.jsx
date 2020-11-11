import React from "react"
import UserPage from "./UserPage";
import withAuthRedirect from "../HOC/withAuthRedirect";
import {connect} from "react-redux";

class UserPageContainer extends React.Component {
    render() {
return(
    <UserPage/>
)

    }
}

let mapStateToProps = (state) => ({

});

let AuthRedirectComponent = withAuthRedirect(UserPageContainer);

export default connect(mapStateToProps, {

})(AuthRedirectComponent)