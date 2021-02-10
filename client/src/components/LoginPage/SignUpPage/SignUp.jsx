import React from "react";
import {useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";
import styles from "./signUpPage.module.css"
import {NavLink} from "react-router-dom";

const SignUp = (props) => {
    const {register, errors, handleSubmit} = useForm();
    const onSubmit = (data) => {
        props.signUp(data);
    };
    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
                <Form.Group controlId="formBasicEmail" >
                    <Form.Control type="email" name="email"
                                  ref={register({required: true})}
                                  placeholder="Email address"/>
                    {errors.email?.type === "required" &&
                    (<p>Your email is required</p>)}
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Control type="text" name="name"
                                  ref={register({required: true, mnLength: 1})}
                                  placeholder="User name"/>
                    {errors.name?.type === "required" &&
                    (<p>Your name is required</p>)}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" name="password"
                                  ref={register({required: true, maxLength:20, minLength: 6})}
                                  placeholder="Password"/>
                    {errors.password?.type === "maxLength" &&
                    (<p>Your password exceed max length of 20 characters</p>)}
                    {errors.password?.type === "minLength" &&
                    (<p>Your password exceed min length of 6 characters</p>)}
                    {errors.password?.type === "required" &&
                    (<p>Your password is required</p>)}

                </Form.Group>

                <Button variant="info" type="submit">Sign Up</Button>{' '}
                <div className={styles.text}>
                    <h6> Have Account? <NavLink to="/auth/login"> Login </NavLink></h6>
                </div>
            </form>
        </div>
    )
}

export default SignUp