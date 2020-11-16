import React from "react"
import styles from "./Profile.module.css"
import Item from "./Item";
import NavBarContainer from "../Navbar/NavbarContainet";
import UserName from "./ProfileInfo/UserName";
import UserDescription from "./ProfileInfo/UserDescription";

const Profile = (props) => {


    const items = props.histories.map(i => <Item id={i._id} key={i._id} name={i.name}
                                                 title={i.title} author={i.author} description={i.description}
                                                 rating={i.rating} tags={i.tags} like={i.like}
                                                 authUser={props.authUser} updateHistory={props.updateHistory}/>);

    return (
        <div className={styles.content}>
            <div className={styles.nav}>
                <NavBarContainer/>
            </div>
            <div className={styles.userInfo}>
                <UserName updateHistoryAuthor={props.updateHistoryAuthor}
                          updateUser={props.updateUser}
                          userProfile={props.userProfile}/>
                <UserDescription updateUser={props.updateUser} userProfile={props.userProfile}/>
            </div>
            <div className={styles.items}>
                {items}
            </div>
        </div>
    )
}

export default Profile