import styles from "../profile.module.css";
import {NavLink} from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import React, {useEffect, useState} from "react";

const UserName = (props) => {

    const [editName, setEditName] = useState(false);
    const [name, setName] = useState(props.userProfile.name);

    useEffect(() => {
        setName(props.userProfile.name);
    }, [props.userProfile.name]);

    const activateEditName = () => {
        setEditName(true);
    };
    const deactivateEditName = () => {
        setEditName(false);
        props.updateUser({userId: props.userProfile.id, name})
        props.updateHistoryAuthor({userId: props.userProfile.id, name})
    };
    const changeName = (e) => {
        setName(e.currentTarget.value);
    };
    return (
        <div className={styles.author}>
            {!editName &&
            <span>
                        <NavLink to={`/profile/${props.userProfile.id}`}>
                        <span>
                            {props.userProfile.name || "click and redact name"}
                        </span>
                    </NavLink>
                       {props.myPage && <span className={styles.icon}>
                            <CreateIcon titleAccess={"Click to redact"}
                                        onClick={activateEditName} fontSize="small"/>
                        </span>}
                    </span>
            }
            {editName && <input autoFocus={true} onBlur={deactivateEditName}
                                type={"text"} onChange={changeName} value={name}/>}
        </div>
    )
};

export default UserName