import React from "react";
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import styles from "./createHistoryPage.module.css";

const HistoryCreatePage = (props) => {
    const {register, handleSubmit, errors} = useForm();
    const onSubmit = (value) => {
        props.createHistory({
            title: value.title,
            description: value.description,
            userName: props.userName,
            userId: props.userId,
        });
    };

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>History Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title"
                                  name="title" ref={register({required: true, mnLength: 1})}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlDescription">
                    <Form.Label>History Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter description"
                                  name="description" ref={register({required: true, mnLength: 1})}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </form>
        </div>
    )
};

export default HistoryCreatePage