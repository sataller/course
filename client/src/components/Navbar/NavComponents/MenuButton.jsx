import styles from "./navComponents.module.css";
import {Dropdown, DropdownButton} from "react-bootstrap";
import React from "react";
import Preloader from "../../common/Preloader/Preloader";

const MenuButton = (props) => {
    let role;
    if (props.authUser) {
        if (props.authUser.role === "admin") {
            role = true
        } else {
            role = false
        }
    } else {
        return <Preloader/>
    }
    const changeThem = (e) => {
        let them;
        if (props.authUser.them === "night") {
            them = "day";
        } else {
            them = "night"
        }
        props.updateUser({userId: props.authUser.id, them});
    };
    return (
        <div className={styles.signButtons}>
            <DropdownButton className={styles.buttons} variant="outline-secondary"
                            id="dropdown-basic-button" title="Menu">
                {role && <Dropdown.Item href="/admin">Admin</Dropdown.Item>}
                <Dropdown.Item href="/main">Main</Dropdown.Item>
                <Dropdown.Item href={`/profile/${props.authUser.id}`}>Profile</Dropdown.Item>
                <Dropdown.Item onClick={changeThem}>Chang them</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={props.signOut}>Sign Out</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default MenuButton
