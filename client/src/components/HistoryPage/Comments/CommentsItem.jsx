import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./comments.module.css"

const CommentItem = (props) => {

    return (
        <div className={styles.item}>
            <NavLink className={styles.name} to={`/profile/${props.userId}`}>
                <h5>
                    {props.userName}
                </h5>
            </NavLink>
            <span className={styles.body}>
                {props.body}
            </span>
        </div>
    )
};

export default CommentItem