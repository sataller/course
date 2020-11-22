import React from "react"
import styles from "./historyPage.module.css"
import ChapterItem from "./ChapterItem/ChapterItem";
import NavBarContainer from "../Navbar/NavbarContainet";
import HistoryInfo from "./HistoryInfo/HistoryInfo";
import TableOfContents from "./TableOfContents/TableOfContents";
import htmlParser from "react-html-parser";
import CommentsContainer from "./Comments/CommentsContainer";

const HistoryPage = (props) => {

    let items = props.history.chapters.map(i => <ChapterItem key={i._id} image={i.imageSrc} title={i.title}
                                                             body={i.body}/>
    );

    const description = htmlParser(props.history.description);

    return (
        <div className={styles.content}>
            <div className={styles.nav}>
                <NavBarContainer/>
            </div>
            <div className={styles.itemInfo}>
                <HistoryInfo authUser={props.authUser}
                             updateHistory={props.updateHistory}
                             deleteHistory={props.deleteHistory}
                             history={props.history}/>
            </div>
            <div className={styles.tableOfContents}>
                <TableOfContents history={props.history}
                                 authUser={props.authUser}
                                 deleteChapter={props.deleteChapter}
                                 updateChapter={props.updateChapter}/>
            </div>
            <div className={styles.item}>
                {description}
                {items}
            </div>
            <div className={styles.comment}>
                <CommentsContainer/>
            </div>
        </div>
    )
}

export default HistoryPage