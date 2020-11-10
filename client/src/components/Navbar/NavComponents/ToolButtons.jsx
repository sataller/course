import React from "react";
import {Button} from "react-bootstrap";
import styles from "./navComponents.module.css"

const ToolButtons = (props) => {
    const deleteUser = () => {
        props.deleteUser(props.selectedUsersId)
    }
    return (
        <div className={styles.buttons}>
            <div className={styles.toolButtons}>
                <Button className={styles.button} variant="outline-secondary"
                        onClick={() => {
                            props.updateUserStatus(false, props.selectedUsersId)
                        }}>Block</Button>{' '}
                <Button className={styles.button} variant="outline-secondary"
                        onClick={() => {
                            props.updateUserStatus(true, props.selectedUsersId);
                        }}>Unblock</Button>{' '}
                <Button className={styles.button} variant="outline-secondary"
                        onClick={deleteUser}>Delete</Button>{' '}
            </div>
        </div>

    )
}

export default ToolButtons


