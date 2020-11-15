import React from "react"
import styles from "./mainPage.module.css"
import HistoryItems from "./HistoryItems/HistoryItems";
import NavBarContainer from "../Navbar/NavbarContainet";
import {connect} from "react-redux";
import {setHistories, updateHistory} from "../../redux/historyReducer";

class MainPageContainer extends React.Component {
    componentDidMount() {
        this.props.setHistories();
    };

    render() {
        return (
            <div className={styles.main}>
                <div className={styles.nav}><NavBarContainer/></div>
                <div className={styles.content}>
                    <HistoryItems histories={this.props.histories}
                                  authUser={this.props.authUser}
                                  updateHistory={this.props.updateHistory}/>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    histories: state.historyPage.histories,
    authUser: state.authPage.authUser,
});

export default connect(mapStateToProps, {setHistories, updateHistory})(MainPageContainer)