import React from "react"
import styles from "./mainPage.module.css"
import NavBar from "../Navbar/Navbar";
import HistoryItems from "./HistoryItems/HistoryItems";

const MainPage = (props) => {
    return (
        <div className={styles.main}>
            <div className={styles.nav}><NavBar/></div>
            <div className={styles.content}><HistoryItems/></div>
        </div>
    )
}

export default MainPage