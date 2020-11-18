import React from "react";
import {Button, Dropdown} from "react-bootstrap";
import style from "../userPage.module.css";

const UserItem = (props) => {

    const deleteUser = () => {
        props.deleteUser(props.id, props.authUser.id)
    };
    const changeRole = (e) => {
        props.updateUser({userId: props.id, role: e.target.innerText})
    };
    const setActiveUser = () => {
      props.updateUser({userId: props.id, status: true})
    };
    const setBlockedUser = () => {
      props.updateUser({userId: props.id, status: false})
    };
    return (
        <tr>
            <td>{props.name}</td>
            <th>{props.email}</th>
            <th>{props.registerDate}</th>
            <th>
                <Dropdown>
                    <Dropdown.Toggle className={style.button} variant="success" id="dropdown-basic">
                        {props.role}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item value="admin" onClick={changeRole}>admin</Dropdown.Item>
                        <Dropdown.Item value="user" onClick={changeRole}>user</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </th>
            <th>
                <Dropdown>
                    <Dropdown.Toggle className={style.button} variant="success" id="dropdown-basic">
                        {props.status ? "Active" : "Blocked"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item value={true}
                                       onClick={setActiveUser}>
                            Active
                        </Dropdown.Item>
                        <Dropdown.Item value={false}
                                       onClick={setBlockedUser}>
                            Blocked
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </th>
            {/*<th>{props.status ? "Active" : "Blocked"}</th>*/}
            <td>
                <Button variant="outline-secondary"
                        onClick={deleteUser}>Delete</Button>{' '}
            </td>
        </tr>
    )
}

export default UserItem