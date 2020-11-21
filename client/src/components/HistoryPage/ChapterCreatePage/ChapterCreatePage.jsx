import React, {useState} from "react";
import style from "./chapterCreatePage.module.css";
import Upload from "../../common/Upload/UploadImage";
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {NavLink, Redirect} from "react-router-dom";

const ChapterCreatePage = (props) => {
    const [file, setFilesToDownload] = useState([]);


    const {register, handleSubmit, errors} = useForm();
    const onSubmit = (value) => {
        props.createChapter({
            title: value.title,
            file: file[0],
            historyId: props.historyId
        });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.container}>
            <div className={style.title}><Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" name={"title"} placeholder="Write title"
                                  ref={register({required: true, mnLength: 1})}
                    />
                </Form.Group>
            </Form></div>
            <Upload setFilesToDownload={setFilesToDownload}/>
            <Button className={style.button} variant="outline-info"
                    as="input" type="submit" value="Submit"/>
        </form>
    )
};

export default ChapterCreatePage