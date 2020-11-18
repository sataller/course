import React from "react"
import styles from "./historyPage.module.css"
import ChapterItem from "./chapterItem/ChapterItem";
import NavBar from "../Navbar/Navbar";
import Item from "../MainPage/HistoryItems/Item/Item";
import NavBarContainer from "../Navbar/NavbarContainet";

const HistoryPage = (props) => {

    let items = props.history.chapters.map(i => <ChapterItem chapterName={i.chapterName}
                                                             body={i.body}/>
    );
    return (
        <div className={styles.content}>
            <div className={styles.nav}><NavBarContainer/></div>
            <div className={styles.item}><Item {...item} /></div>
            <div className={styles.chapter}><Chapters/></div>
            <div className={styles.comment}><Coments/></div>
        </div>
    )
}

export default HistoryPage