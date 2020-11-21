import React from "react";
import styles from "../historyPage.module.css";
import {Image} from "react-bootstrap";
import htmlParser from "react-html-parser";

const chapterItem = (props) => {
    let padding = true;
    if (props.body.length > 600) {
        padding = false;
    }
    const body = htmlParser(props.body);
    return (
        <div className={padding ? styles.chapter : null}>
            <span className={styles.title}>
                <h4>***</h4>
                <h4>{props.title}</h4>
            </span>
            <span>
                <Image className={styles.image} src={props.image} rounded/>
                {body}
            </span>

        </div>
    )
};

export default chapterItem