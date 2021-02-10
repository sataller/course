import React from "react";
import {Button, Form} from "react-bootstrap";
import styles from "./signinPage.module.css"
import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";

const SignIn = (props) => {

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (value) => {
        props.signIn(value.email, value.password);
    };

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
                <Form.Group controlId="formBasicName">
                    <Form.Control type="text" name="email" ref={register({required: true})}
                                  placeholder="Email"/>
                    {errors.email?.type === "required" &&
                    (<p>Your email is required</p>)}
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" name="password" ref={register({required: true})}
                                  placeholder="Password"/>
                    {errors.password?.type === "required" &&
                    (<p>Your password is required</p>)}
                </Form.Group>
                <Button variant="info" type="submit">Sign In</Button>{' '}
                <div className={styles.text}>
                    <h6> Haven't Account? <NavLink to="/auth/register"> Register </NavLink></h6>
                </div>
            </form>
        </div>
    )
};


export default SignIn
