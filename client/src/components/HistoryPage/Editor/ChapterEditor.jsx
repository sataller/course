import * as React from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import {useState} from "react";
import {Button} from "react-bootstrap";
import style from "./chapter.module.css";
import {NavLink} from "react-router-dom";

const mdParser = new MarkdownIt();

const ChapterEditor = (props) => {
    let chapter = "write you text";
    if(!props.chapterId) {
        chapter = props.readableHistory.description
    } else{
        props.readableHistory.chapters.map(i => {
            if (i._id === props.chapterId) {
                chapter = i.body
            }
        });
    }

    const mdEditor = React.useRef(null);
    const [body, setBody] = useState(chapter);

    const handleEditorChange = ({html, text}) => {
        setBody(text)
    };


    const handleClick = () => {
        if (mdEditor.current) {
           if(!props.chapterId){
               props.updateHistory({
                   historyId: props.historyId,
                    description: mdEditor.current.getHtmlValue(),
               })
           } else {
               props.updateChapter({
                   historyId: props.historyId,
                   chapterId: props.chapterId,
                   body: mdEditor.current.getHtmlValue(),
               });
           }
        }
    };

    return (
        <div className={style.editor}>
            <NavLink to={`/history/${props.historyId}`}>
                <Button variant="outline-dark" className={style.button}
                        onClick={handleClick}>Save</Button>
            </NavLink>
            <MdEditor
                ref={mdEditor}
                value={body}
                style={{minHeight: "500px", textAlign: "center",}}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
            />
        </div>
    )
};

export default ChapterEditor

