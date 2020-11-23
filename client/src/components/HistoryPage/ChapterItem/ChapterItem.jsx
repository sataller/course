import React from "react";
import styles from "../historyPage.module.css";
import {Image} from "react-bootstrap";
import htmlParser from "react-html-parser";
import ScrollableAnchor from 'react-scrollable-anchor';

const chapterItem = (props) => {
    let padding = true;
    if (props.body.length > 600) {
        padding = false;
    }

    const body = htmlParser(props.body);

    return (
        <div className={padding ? styles.chapter : null}>
            <ScrollableAnchor id={props.id}>
                <span className={styles.title}>
                    <h4>***</h4>
                    <h4>{props.title}</h4>
                </span>
            </ScrollableAnchor>
            <span>
                    <Image className={styles.image} src={props.image} rounded/>
                    <div className={styles.body}>
                        {body}
                    </div>
                </span>
        </div>
    )
};

export default chapterItem