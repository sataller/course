import React, {useEffect, useState} from "react";
import style from "../historyPage.module.css";
import CreateIcon from "@material-ui/icons/Create";
import {NavLink} from "react-router-dom";
import ModalWindow from "../../common/ModalWindow/ModalWindow";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import {goToAnchor} from "react-scrollable-anchor";

const Chapter = (props) => {

    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState(props.title);

    useEffect(() => {
        setTitle(props.title);
    }, [props.title]);

    const activateEditMode = () => {
        setEdit(true);
    };
    const deactivateEditMode = () => {
        setEdit(false);
        props.updateChapter({
            historyId: props.historyId,
            chapterId: props.id,
            title: title,
        })
    };
    const changeTitle = (e) => {
        setTitle(e.currentTarget.value);
    };
    const deleteChapter = () => {
        props.deleteChapter({
            historyId: props.historyId,
            chapterId: props.id,
        });
    };

    return (
        <div className={style.chapterName}>
            {!props.role && <span>
                    {`${props.itemNumber}. ${props.title}`}
                </span>}
            {props.role &&
            <div>
                {!edit &&
                <span onDoubleClick={activateEditMode}
                      title={"Double click to edit title"}>
                     {`${props.itemNumber}. ${props.title}`}
                    </span>}
                {edit &&
                <input value={title} onChange={changeTitle}
                       autoFocus={true} onBlur={deactivateEditMode}/>}
                <NavLink to={`/editor/${props.historyId}/${props.id}`}>
                        <span className={style.icon}>
                            <CreateIcon titleAccess={"Click to open redactor"}
                                        fontSize="small"/>
                        </span>
                </NavLink>
                <RemoveRedEyeIcon className={style.icon} onClick={() => {
                    goToAnchor(props.id, false)
                }}/>
                <ModalWindow delete={deleteChapter}/>
            </div>}

        </div>

    )
};

export default Chapter
