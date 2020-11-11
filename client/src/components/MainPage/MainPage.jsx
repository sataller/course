import React from "react"
import styles from "./mainPage.module.css"
import HistoryItems from "./HistoryItems/HistoryItems";
import NavBarContainer from "../Navbar/NavbarContainet";

const MainPage = (props) => {
    return (
        <div className={styles.main}>
            <div className={styles.nav}><NavBarContainer/></div>
            <div className={styles.content}><HistoryItems/></div>
        </div>
    )
}

export default MainPage