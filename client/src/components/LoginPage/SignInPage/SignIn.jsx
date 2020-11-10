import React from "react";
import {Button, Form} from "react-bootstrap";
import styles from "./signinPage.module.css"
import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";

const SignIn = (props) => {

    const {register, handleSubmit, errors} = useForm()
    const onSubmit = (data) => {
        props.signIn(data)
        props.setUsers()

    }

    const setAuth = () => {
        props.setAuth()
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Form className={styles.container}>
                    <Form.Group controlId="formBasicName">
                        <Form.Control type="text" name="name" ref={register({required: true, mnLength: 1})}
                                      placeholder="User name"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" name="password" ref={register({required: true, mnLength: 1})}
                                      placeholder="Password"/>
                    </Form.Group>
                    <Button variant="outline-secondary" type="submit">Sign In</Button>{' '}
                    <div className={styles.text}>
                        <h6> Haven't Account? <NavLink to="/auth/register"> Register </NavLink></h6>
                    </div>
                </Form>
            </form>
        </div>
    )
}


export default SignIn