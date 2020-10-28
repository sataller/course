import React from "react"
import {Button} from "react-bootstrap"
import styles from "./Navbar.module.css"
import SearchBlock from "./NavComponents/SearchBlock";
import MenuButton from "./NavComponents/MenuButton";
import {NavLink, Redirect} from "react-router-dom";

const NavBar = (props) => {

    const isAuth = true;
    const signOut = () => {
        alert("click!");
    }

    const signOutElement = (
        <div>
            <MenuButton/>
        </div>
    );
    const login = (
        <div className={styles.login}>
            <div>
                <Button className={styles.button} variant="secondary"
                        onClick={signOut}>
                    <NavLink to={"/auth/register"}>
                        Sign Up
                    </NavLink>
                </Button>{' '}
            </div>
            <div>
                <Button className={styles.button} variant="secondary"
                        onClick={signOut}>
                    <NavLink to={"/auth/login"}>
                        Sign In
                    </NavLink>
                </Button>{' '}
            </div>
        </div>
    )

    return (
        <div className={styles.content}>
            <SearchBlock/>
            <div className={styles.toolButtons}>
                {isAuth ? signOutElement : login}
            </div>
        </div>
    )
}


export default NavBar