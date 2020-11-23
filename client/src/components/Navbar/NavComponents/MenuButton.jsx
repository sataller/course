import styles from "./navComponents.module.css";
import {Dropdown, DropdownButton} from "react-bootstrap";
import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";

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

    const signOut = () => {
        props.signOut()
    };

    return (
        <div className={styles.signButtons}>
            <DropdownButton className={styles.buttons} variant="dark"
                            id="dropdown-basic-button" title="Menu">
                {role && <NavLink to={"/admin"}> <Dropdown.Item href="/admin">Admin</Dropdown.Item></NavLink>}
                <NavLink to={"/main"}><Dropdown.Item href="/main">Main</Dropdown.Item></NavLink>
                <NavLink to={`/profile/${props.authUser.id}`}>
                    <Dropdown.Item href={`/profile/${props.authUser.id}`}>
                        Profile
                    </Dropdown.Item>
                </NavLink>
                <Dropdown.Item onClick={changeThem}>Chang them</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default MenuButton
