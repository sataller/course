import React from "react";
import style from "../historyPage.module.css";
import CreateIcon from "@material-ui/icons/Create";
import {NavLink} from "react-router-dom";

const Chapter = (props) => {

    return (
        <div>
            <div className={style.chapter}>
                {props.chapterName}
                <span className={style.icon}>
                <NavLink to={`/history/editor/${props.id}`}>
                    <CreateIcon titleAccess={"Click to open redactor"}
                               fontSize="small"/>
                </NavLink>
                </span>
            </div>
        </div>

    )
};

export default Chapter
