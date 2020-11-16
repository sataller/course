import React from "react"
import {Dropdown} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import styles from "./Profile.module.css"
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
    // Rating update
    // const updateRating = (value) => {
    //     if (props.authUser) {
    //         props.updateHistory({historyId: props.id, rating: value});
    //     } else {
    //         alert("You are not logged in")
    //     }
    // };
    //Edit component
    // const editItem = () => {
    //     alert("editItem")
    // };
    // {edit && <Button className={styles.editButton}
    //                  onClick={editItem}
    //                  variant="outline-secondary">Edit
    // </Button>}
    // let edit = false;
    // if (props.authUser) {
    //     if (props.authUser.id === props.author.user ||
    //         props.authUser.role === "admin") {
    //         edit = true
    //     } else {
    //         edit = false
    //     }
    // }
    const tags = props.tags.map(i => i.tagName);
    return (
        <div className={styles.item}>
            <div>
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
                    {props.description}
                </div>
            </div>
        </div>
    )
}

export default Item