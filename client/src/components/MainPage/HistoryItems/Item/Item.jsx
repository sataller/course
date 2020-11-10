import React from "react"
import styles from "./item.module.css"
import {Dropdown, Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const Item = (props) => {

    const updateLick = () => {
        alert("Lick")
    };
    const editItem = () => {
        alert("editItem")
    };

    return (
        <div className={styles.item}>
            <div>
                <Button className={styles.editButton} onClick={editItem} variant="outline-secondary">Edit</Button>{' '}
                <span><h3><NavLink to={`/history/1`}>{props.title}</NavLink></h3>
                    <span className={styles.lick} onClick={updateLick}>Lick: {props.lick}</span></span>
                <div className={styles.author}>
                    <NavLink to={`/profile/${props.userId}`}>{props.userName}</NavLink>
                </div>
                <div className={styles.info}>
                    <span>Tags: {props.tags.join(", ")}</span>
                </div>
                <Dropdown.Divider/>
                <div className={styles.description}>{props.description}</div>
            </div>
        </div>
    )
}

export default Item