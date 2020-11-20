import React from "react"
import style from "../historyPage.module.css"
import Chapter from "./Chapter";
import {Button} from "react-bootstrap";

const TableOfContents = (props) => {
    let role = false;
    if (props.authUser) {
        if (props.history.author.user === props.authUser.id ||
            props.authUser.role === "admin") {
            role = true;
        }
    }
    let item = props.history.chapters.map(i => <Chapter historyId={props.history._id} title={i.title}
                                                        authorId={props.history.author.user}
                                                        id={i._id} key={i._id} body={i.body}
                                                        updateChapter={props.updateChapter}
                                                        authUser={props.authUser} role={role}/>);

    const addNewChapter = () => {
        alert("hagfsdhgfagfsd")
    };

    return (
        <>
            {item}
           {role && <Button variant="outline-warning" className={style.button}
                    onClick={addNewChapter}>+ add new chapter </Button>}
        </>
    )
}

export default TableOfContents