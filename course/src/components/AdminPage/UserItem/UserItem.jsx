import React from "react";
import {Form} from "react-bootstrap";

const UserItem = (props) => {
    const updateCheckbox = (e) => {
        // props.setSelect(props.id, e.target.checked)
        console.log(e.target.checked)
    }
    return (
        <tr>
            <td>
                {props.selectedOll?
                    <input type={"checkbox"} checked onChange={updateCheckbox} aria-label="option 1"/> :
                    <input type={"checkbox"} onChange={updateCheckbox} aria-label="option 1"/>
                }

            </td>


            < td> {props.id}</td>
            <td>{props.name}</td>
            <th>{props.email}</th>
            <th>{props.registerDate}</th>
            <th>{props.lastLoginDate}</th>
            <th>{props.status ? "Active" : "Blocked"}</th>
        </tr>
    )
}

export default UserItem