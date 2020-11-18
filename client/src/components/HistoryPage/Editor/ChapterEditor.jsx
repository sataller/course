import * as React from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import {useState} from "react";
import {Button} from "react-bootstrap";
import style from "../historyPage.module.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ChapterEditor = (props) => {
    // const mdEditor = React.useRef(null);

    const [body, setBody] = useState(props.body);

const handleEditorChange = ({html, text}) => {
    setBody(text)
    };

    const handleClick = (e) => {
        // if (mdEditor.current) {
        //     alert(mdEditor.current.getMdValue());
        // }
        console.log(e)
    };

    return (
        <>
            <Button variant="outline-dark" className={style.button}
                   onClick={handleClick}>Save</Button>
            <MdEditor
                // ref={mdEditor}
                value={body}
                style={{ height: "80%", textAlign: "center"}}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
            />
            </>
    )
};

export default ChapterEditor

