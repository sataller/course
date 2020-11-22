import React from "react"
import style from "../historyPage.module.css"
import Chapter from "./Chapter";
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const TableOfContents = (props) => {

    let item = props.history.chapters.map(i => <Chapter historyId={props.history._id} title={i.title}
                                                        authorId={props.history.author.user}
                                                        id={i._id} key={i._id} body={i.body}
                                                        updateChapter={props.updateChapter}
                                                        deleteChapter={props.deleteChapter}
                                                        authUser={props.authUser} role={props.role}
                                                        itemNumber={(props.history.chapters.indexOf(i)) + 1}/>);

    return (
        <>
            {item}
            {props.role && <NavLink to={`/create/${props.history._id}/chapter`}>
                <Button variant="outline-warning" className={style.button}>
                    + add new chapter
                </Button>
            </NavLink>}
        </>
    )
}

export default TableOfContents