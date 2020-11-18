import React, {useEffect, useState} from "react";

const Title = (props) => {
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
        props.updateTitle(title)
    };
    const changeTitle = (e) => {
        setTitle(e.currentTarget.value);
    };
    return (
        <>
            {!edit && <span title={"double click to redact"} onDoubleClick={activateEditMode}>{props.title}</span>}
            {edit && <input onBlur={deactivateEditMode} onChange={changeTitle}
                            autoFocus={true} type={"text"} value={title}/>}
        </>
    )
};

export default Title