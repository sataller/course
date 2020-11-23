import React from "react";
import styles from "./historyInfo.module.css";
import {NavLink} from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {Dropdown} from "react-bootstrap";
import SimpleRating from "../../common/Rating/SimpleRating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Title from "../../MainPage/HistoryItems/HistoryComponents/Title";
import ModalWindow from "../../common/ModalWindow/ModalWindow";
import HistoryDescription from "../HistoryDescription/HistoryDescription";

const HistoryInfo = (props) => {

    let ratingNumber = 0;
    if (props.authUser) {
        props.history.rating.ratingAddUsers.map(i => {
            if (i.user === props.authUser.id) {
                ratingNumber = i.rating
            }
        });
    }

    const updateLike = () => {
        if (props.authUser) {
            props.updateHistory({historyId: props.history._id, like: true});
        } else {
            alert("You are not logged in")
        }
    };

    const updateRating = (value) => {
        if (props.authUser) {
            props.updateHistory({
                historyId: props.history._id,
                rating: value
            });
        } else {
            alert("You are not logged in")
        }
    };
    const updateTitle = (value) => {
        if (props.authUser) {
            props.updateHistory({historyId: props.history._id, title: value});
        } else {
            alert("You are not logged in")
        }
    };
    const deleteHistory = () => {
        props.deleteHistory({historyId: props.history._id});
    };

    const tags = props.history.tags.map(i => i.tagName);

    return (
        <div className={styles.item}>
            <div>
                <span>
                    <h3>
                       {props.edit && <Title title={props.history.title} edit={props.edit}
                                             updateTitle={updateTitle}/>}
                        {!props.edit && props.history.title}
                        <span className={styles.lick}>
                            <StarBorderIcon/> {props.history.rating.ratingNumber}
                        </span>
                        {props.edit && <ModalWindow delete={deleteHistory}/>}
                    </h3>
                    <span className={styles.lick}>
                       <SimpleRating updateRating={updateRating}
                                     rating={ratingNumber}/>
                    </span>
                </span>
                <div className={styles.author}>
                    <NavLink to={`/profile/${props.history.author.user}`}>
                        {props.history.author.userName}
                    </NavLink>
                </div>
                <span className={styles.lick}
                      onClick={updateLike}>
                        <FavoriteIcon color="secondary"/>
                    {props.history.like.likeNumber}
                    </span>
                <div className={styles.info}>
                    <span>Tags: {tags.join(", ")}</span>
                </div>
                <Dropdown.Divider/>
                <div className={styles.description}>
                    <HistoryDescription edit={props.edit} historyId={props.history._id}
                                        description={props.history.description}/>
                </div>
            </div>
        </div>
    )
};

export default HistoryInfo