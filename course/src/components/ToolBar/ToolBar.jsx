import React from "react";
import {Button, Dropdown, DropdownButton} from "react-bootstrap";
import styles from "./toolBar.module.css"
import ToolButtons from "../Navbar/NavComponents/ToolButtons";
import SearchBlock from "../Navbar/NavComponents/SearchBlock";
import MenuButton from "../Navbar/NavComponents/MenuButton";

const ToolBar = (props) => {

    return (
        <div className={styles.buttons}>
            <ToolButtons/>
            <SearchBlock/>
            <MenuButton/>
        </div>

    )
}

export default ToolBar


