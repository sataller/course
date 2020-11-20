import React from "react"
import styles from "./historyPage.module.css"
import ChapterItem from "./chapterItem/ChapterItem";
import NavBarContainer from "../Navbar/NavbarContainet";
import Comments from "./Comments/Comments";
import HistoryInfo from "./HistoryInfo/HistoryInfo";
import TableOfContents from "./TableOfContents/TableOfContents";

const HistoryPage = (props) => {

    let items = props.history.chapters.map(i => <ChapterItem image={i.imageSrc} title={i.title}
                                                             body={i.body}/>
    );
    return (
        <div className={styles.content}>
            <div className={styles.nav}>
                <NavBarContainer/>
            </div>
            <div className={styles.itemInfo}>
                <HistoryInfo authUser={props.authUser}
                             updateHistory={props.updateHistory}
                             history={props.history}/>
            </div>
            <div className={styles.tableOfContents}>
                <TableOfContents history={props.history}
                                 authUser={props.authUser}
                                 updateChapter={props.updateChapter}/>
            </div>
            <div className={styles.item}>
                {props.history.description}
                {items}
            </div>
            <div className={styles.comment}><Comments/></div>
        </div>
    )
}

export default HistoryPage