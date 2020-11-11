import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./signUpPage.module.css"
import {Badge} from "react-bootstrap";

const RegisterConfirmedPage = (props) => {
    return (
        <div className={styles.completedPage}>
            <h5><span>Your email is confirmed. Now
            <Badge variant="light" className={styles.link}><NavLink to={"/auth/login"}>
                    Login
                </NavLink></Badge>
            </span></h5>
        </div>
    )
};

export default RegisterConfirmedPage

