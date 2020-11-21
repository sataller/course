import styles from "../profile.module.css";
import CreateIcon from "@material-ui/icons/Create";
import React, {useEffect, useState} from "react";

const UserDescription = (props) => {

    const [editDescription, setEditDescription] = useState(false);
    const [description, setDescription] = useState(props.userProfile.description);

    useEffect(() => {
        setDescription(props.userProfile.description);
    }, [props.userProfile.description]);

    const activateEditDescription = () => {
        setEditDescription(true);
    };
    const deactivateEditDescription = () => {
        setEditDescription(false);
        props.updateUser({userId: props.userProfile.id, description})
    };
    const changeDescription = (e) => {
        setDescription(e.currentTarget.value);
    };
    return (
        <div>
            <span> О себе:</span>
            {!editDescription &&
            <div>
                <span>
                    {props.userProfile.description}
                </span>
               {props.myPage && <span className={styles.icon}>
                    <CreateIcon titleAccess={"Click to redact"}
                                onClick={activateEditDescription} fontSize="small"/>
                </span>}
            </div>}
            {editDescription &&
            <div>
                <input autoFocus={true} onBlur={deactivateEditDescription}
                        type={"text"} onChange={changeDescription} value={description}/>
            </div>}
        </div>
    )
};

export default UserDescription