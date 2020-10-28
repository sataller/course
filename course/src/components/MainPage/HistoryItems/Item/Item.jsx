import React from "react"
import styles from "./item.module.css"
import {DropdownButton, Dropdown} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const Item = (props) => {

    return (
        <div className={styles.item}>
            <div>
                <div className={styles.menu}>
                    <DropdownButton id="dropdown-basic-button">
                        <Dropdown.Item onClick={() => {
                            alert("lick")
                        }}>Lick</Dropdown.Item>
                    </DropdownButton>
                </div>
                <h3>{props.title}</h3>
                <div className={styles.author}>
                    <NavLink to={`/profile/${props.userId}`}>{props.userName}</NavLink>
                </div>
                <div className={styles.info}>
                    <span>Tags: {props.tags}</span>
                </div>
                <Dropdown.Divider/>
                <div className={styles.description}>{props.description}</div>
            </div>
        </div>
    )
}

export default Item