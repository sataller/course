import React from "react";
import style from "./historyDescription.module.css";
import CreateIcon from "@material-ui/icons/Create";
import {NavLink} from "react-router-dom";
import htmlParser from "react-html-parser";

const HistoryDescription = (props) => {
    const body = htmlParser(props.description);

    return (
        <span>
              {props.edit && <NavLink className={style.link} to={`/editor/${props.historyId}`}>
                <span className={style.icon}>
                <CreateIcon titleAccess={"Click to open redactor"}
                            />
            </span>
              </NavLink>}
            {body}
        </span>
    )
};

export default HistoryDescription