import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./signUpPage.module.css"
import {Badge} from "react-bootstrap";

const RegisterCompletedPage = (props) => {
    return (
        <div className={styles.completedPage}>
            <h5><span>You are registered, now you need to confirm your email and

            <Badge variant="light" className={styles.link}><NavLink to={"/auth/login"}>
                    Login
                </NavLink></Badge>
            </span></h5>
        </div>
    )
};

export default RegisterCompletedPage

