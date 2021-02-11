import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./comments.module.css"

const CommentItem = (props) => {
    let say = (e) =>{
        if (!props.userId){
           alert("This user is deleted");
           e.preventDefault();
       }
    };
    return (
        <div className={styles.item}>
            <NavLink onClick={say} className={styles.name} to={props.userId? `/profile/${props.userId}`:
                `/profile/${props.authUserId}`}>
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