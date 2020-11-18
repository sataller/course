import React from "react"
import style from "../historyPage.module.css"
import Chapter from "./Chapter";
import {Button} from "react-bootstrap";

const TableOfContents = (props) => {
    debugger
    let item = props.history.chapters.map(i => <Chapter chapterName={i.chapterName} id={i._id} key={i._id}
                                                        body={i.body} updateChapter={props.updateChapter} />);

    const addNewChapter = () => {
      alert("hagfsdhgfagfsd")
    };

    return (
        <>
            {item}
            <Button variant="outline-warning" className={style.button}
                    onClick={addNewChapter}>+ add new chapter </Button>
            {/*<span className={style.add} onClick={addNewChapter}> + add new chapter </span>*/}
        </>
    )
}

export default TableOfContents