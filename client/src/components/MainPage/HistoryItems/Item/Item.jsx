import React from "react"
import {Dropdown} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import styles from "./item.module.css"
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';


const Item = (props) => {

    const updateLike = () => {
        if (props.authUser) {
            props.updateHistory({historyId: props.id, like: true});
        } else {
            alert("You are not logged in")
        }
    };

    const tags = props.tags.map(i => i.tagName);
    return (
        <div className={styles.item}>
            <div>
                <span>
                    <h3>
                        <NavLink to={`/history/${props.id}`}>{props.title}</NavLink>
                    </h3>
                    <span className={styles.lick}>
                        <StarBorderIcon/> {props.rating.ratingNumber}
                    </span>
                </span>
                <div className={styles.author}>
                    <NavLink to={`/profile/${props.author.user}`}>
                        {props.author.userName}
                    </NavLink>
                </div>
                <span className={styles.lick}
                      onClick={updateLike}>
                        <FavoriteIcon
                            color="secondary"/> {props.like.likeNumber}
                    </span>
                <div className={styles.info}>
                    <span>Tags: {tags.join(", ")}</span>
                </div>
                <Dropdown.Divider/>
                <div className={styles.description}>
                    {props.description}
                </div>
            </div>
        </div>
    )
}

export default Item