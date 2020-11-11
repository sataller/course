import React from "react";
import {useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";
import styles from "./signUpPage.module.css"
import {NavLink} from "react-router-dom";

const SignUp = (props) => {
    const {register, handleSubmit} = useForm()
    const onSubmit = (data) => {
        props.signUp(data.email, data.name, data.password);
        alert(props.message)
    }
    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" name="email"
                                  ref={register({required: true, mnLength: 1})}
                                  placeholder="Email address"/>
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Control type="text" name="name"
                                  ref={register({required: true, mnLength: 1})}
                                  placeholder="User name"/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" name="password"
                                  ref={register({required: true, mnLength: 1})}
                                  placeholder="Password"/>
                </Form.Group>

                <Button variant="outline-secondary" type="submit" type="submit">Sign Up</Button>{' '}
                <div className={styles.text}>
                    <h6> Have Account? <NavLink to="/auth/login"> Login </NavLink></h6>
                </div>
            </form>
        </div>
    )
}

export default SignUp