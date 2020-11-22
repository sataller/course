import React from "react"
import {Dropdown} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import styles from "./profile.module.css"
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import htmlParser from "react-html-parser";


const Item = (props) => {
    const updateLike = () => {
        if (props.authUser) {
            props.updateHistory({historyId: props.id, like: true});
        } else {
            alert("You are not logged in")
        }
    };

    const tags = props.tags.map(i => i.tagName);
    const description = htmlParser(props.description);

    return (
        <div className={styles.item}>
                <span>
                    <h3>
                        <NavLink to={`/history/${props.id}`}>{props.title}</NavLink>
                          <span className={styles.rate}>
                        <StarBorderIcon fontSize="small"/> {props.rating.ratingNumber}
                    </span>
                    </h3>
                      <span className={styles.like}
                            onClick={updateLike}>
                        <FavoriteIcon
                            color="secondary"/> {props.like.likeNumber}
                    </span>
                </span>
            <div className={styles.info}>
                <span>Tags: {tags.join(", ")}</span>
            </div>
            <Dropdown.Divider/>
            <div className={styles.description}>
                {description}
            </div>
        </div>
    )
}

export default Item