import React from "react";
import {Button} from "react-bootstrap";
import styles from "./navComponents.module.css"

const ToolButtons = (props) => {
    const deleteUser = () => {
        props.deleteUser(props.selectedUsersId)
    };
    const changeStatus = (e) => {
        props.updateUserStatus()
        props.updateUser({userId:props.id, role:e.target.innerText})
    };
    return (
        <div className={styles.buttons}>
            <div className={styles.toolButtons}>
                <Button className={styles.button} variant="outline-secondary"
                        onClick={() => {
                            changeStatus(false, props.selectedUsersId)
                        }}>Block</Button>{' '}
                <Button className={styles.button} variant="outline-secondary"
                        onClick={() => {
                            changeStatus(true, props.selectedUsersId)
                        }}>Unblock</Button>{' '}
                <Button className={styles.button} variant="outline-secondary"
                        onClick={deleteUser}>Delete</Button>{' '}
            </div>
        </div>

    )
}

export default ToolButtons


