import React from "react";
import {Button, Form} from "react-bootstrap";
import CommentItem from "./CommentsItem";
import {useForm} from "react-hook-form";
import styles from "./comments.module.css"

const Comments = (props) => {
    const {
        register, handleSubmit, errors} = useForm();

    const addComment = (data,e) => {
        let comment = {
            historyId: props.readableHistory._id,
            body: data.comment,
            userId: props.authUser.id,
            userName: props.authUser.name
        };
        props.sendNewComment(comment);
        e.target.reset();

    };

    const items = props.comments.map(i => <CommentItem userId={i.userId} key={i.userId}
                                                       userName={i.userName} body={i.body}/>);

    return (
        <div>
            <h5>Отзывы</h5>
            <div>
                {items}
            </div>
         {props.role && <form onSubmit={handleSubmit(addComment)}>
                <Form.Group controlId="exampleForm.ControlComment">
                    <Form.Control as="textarea" rows={3} placeholder="Enter comment"
                                  name="comment" ref={register({required: true, mnLength: 1})}/>
                </Form.Group>
                {errors.comment && <span className={styles.error}>"Comment is required"</span>}
                <Button className={styles.button} variant="outline-primary" type="submit">
                    Add
                </Button>
            </form>}
        </div>
    )
};

export default Comments