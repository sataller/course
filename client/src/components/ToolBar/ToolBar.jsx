import React from "react";
import styles from "./toolBar.module.css"
import SearchBlock from "../Navbar/NavComponents/SearchBlock";
import MenuButton from "../Navbar/NavComponents/MenuButton";

const ToolBar = (props) => {
    return (
        <div className={styles.buttons}>
            <SearchBlock/>
            <MenuButton signOut={props.signOut} updateUser={props.updateUser}
                        authUser={props.authUser}/>
        </div>

    )
}

export default ToolBar


