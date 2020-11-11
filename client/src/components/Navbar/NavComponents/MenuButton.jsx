import styles from "./navComponents.module.css";
import {Dropdown, DropdownButton} from "react-bootstrap";
import React from "react";

const MenuButton = (props) => {
    let nightMode = false;

    const changeThem = () => {
        nightMode = !nightMode;
        alert(nightMode);
    }
    return (
        <div className={styles.signButtons}>
            <DropdownButton className={styles.buttons} variant="outline-secondary"
                            id="dropdown-basic-button" title="Menu">
                <Dropdown.Item href="/admin">Admin</Dropdown.Item>
                <Dropdown.Item href="/main">Main</Dropdown.Item>
                <Dropdown.Item href="/user">Profile</Dropdown.Item>
                {nightMode ? <Dropdown.Item onClick={changeThem}>Chang them</Dropdown.Item> :
                    <Dropdown.Item onClick={changeThem}>Chang them</Dropdown.Item>}
                <Dropdown.Divider/>
                <Dropdown.Item onClick={props.signOut}>Sign Out</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default MenuButton
