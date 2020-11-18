import React from "react";
import {Table} from "react-bootstrap";
import styles from "./userPage.module.css"
import UserItem from "./UserItem/UserItem";
import {Redirect} from "react-router-dom";

const UserPage = (props) => {

    if (!props.authUser)  {
    } else if (localStorage.getItem('Authorization') === null ) {
        return <Redirect to="auth/login"/>
    } else if (props.authUser.status !== true) {
        props.signOut();
    }else if (props.authUser.role !== "admin") {
        return <Redirect to="/main"/>
    }
    const usersElement = props.users.map(i => <UserItem id={i.id} email={i.email}
                                                        name={i.name} registerDate={i.registerDate}
                                                        role={i.role} status={i.status}
                                                        selected={i.selected} key={i.id}
                                                        updateUser={props.updateUser}
                                                        deleteUser={props.deleteUser}
                                                        authUser={props.authUser}
                                                        setSelect={props.setSelect}/>);
    return (
        <div className={styles.table}>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Register date</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Delete</th>
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