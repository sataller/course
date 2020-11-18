import React from "react";

const chapterItem = (props) => {
    return (
        <div>
        <h4>{props.chapterName}</h4>
    <span> {props.body}</span>

    </div>
    )
};

export default chapterItem