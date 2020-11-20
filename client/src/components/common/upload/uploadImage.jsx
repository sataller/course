import React, {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import style from './upload.module.css'

function Upload(props) {
    // const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop});

    // const onDrop = useCallback(acceptedFiles => {
    //     console.log(acceptedFiles);
    // });
    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/jpeg, image/png, image/jpg',
        onDrop: acceptedFiles => {
            console.log(acceptedFiles);
            props.setFilesToDownload(acceptedFiles);

            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        <div className={style.thumb} key={file.name}>
            <div className={style.thumbInner}>
                <img
                    src={file.preview}
                    className={style.img}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
    return (
        <section className={style.container}>
            <div {...getRootProps({className: style.dropzone})}>
                <input {...getInputProps()} />
                <p>
                    Drag 'n' drop some files here, or click to select files.
                    You can upload .jpg, .jpeg, .png
                </p>
            </div>
            <aside className={style.thumbsContainer}>
                {thumbs}
            </aside>
        </section>
    );
}

export default Upload