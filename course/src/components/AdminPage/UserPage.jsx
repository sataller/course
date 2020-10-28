import React from "react";
import {Table} from "react-bootstrap";
import styles from "./userPage.module.css"
import UserItem from "./UserItem/UserItem";

const UserPage = (props) => {

    const usersElement = props.users.map(i => <UserItem id={i.userId} email={i.email}
                                                        name={i.userName} registerDate={i.registerDate}
                                                        lastLoginDate={i.lastLoginDate} status={i.status}
                                                        selected={i.selected} key={i.id}
                                                        setSelect={props.setSelect}/>)
    return (
        <div className={styles.table}>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Chose</th>
                    <th>id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Register date</th>
                    <th>Last Login</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {usersElement}
                </tbody>
            </Table>
        </div>
    )
}

export default UserPage