import React from "react"
import {Button} from "react-bootstrap"
import styles from "./Navbar.module.css"
import SearchBlock from "./NavComponents/SearchBlock";
import MenuButton from "./NavComponents/MenuButton";
import {NavLink} from "react-router-dom";
// import Tags from "../Tags/Tags";

const NavBar = (props) => {

    const isAuth = true;
    const signOut = () => {
        alert("click")
    };

    const signOutElement = (
        <div>
            <MenuButton signOut={signOut}/>
        </div>
    );
    const login = (
        <div className={styles.login}>
            <div>
                <Button className={styles.button} variant="secondary">
                    <NavLink to={"/auth/register"}>
                        Sign Up
                    </NavLink>
                </Button>{' '}
            </div>
            <div>
                <Button className={styles.button} variant="secondary">
                    <NavLink to={"/auth/login"}>
                        Sign In
                    </NavLink>
                </Button>{' '}
            </div>
        </div>
    );

    return (
        <div className={styles.content}>
            {/*<Tags/>*/}
            <SearchBlock/>
            <div className={styles.toolButtons}>
                {props.isAuth ? signOutElement : login}
            </div>
        </div>
    )
};


export default NavBar