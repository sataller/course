    import React from "react"
    import styles from "./profile.module.css"
    import Item from "./Item";
    import NavBarContainer from "../Navbar/NavbarContainet";
    import UserName from "./ProfileInfo/UserName";
    import UserDescription from "./ProfileInfo/UserDescription";
    import {NavLink} from "react-router-dom";
    import {Button} from "react-bootstrap";
    import style from "../HistoryPage/historyPage.module.css";

    const Profile = (props) => {
        let role = false;
        if (props.authUser) {
            if (props.userProfile.id === props.authUser.id ||
                props.authUser.role === "admin") {
                role = true;
            }
        }

        const items = props.histories.map(i => <Item id={i._id} key={i._id} name={i.name}
                                                     title={i.title} author={i.author} description={i.description}
                                                     rating={i.rating} tags={i.tags} like={i.like}
                                                     authUser={props.authUser} updateHistory={props.updateHistory}/>);

        return (
            <div className={styles.content}>
                <div className={styles.nav}>
                    <NavBarContainer/>
                </div>
                <div className={styles.contentWrapper}>
                    <div className={styles.userInfo}>
                        <UserName updateHistoryAuthor={props.updateHistoryAuthor}
                                  updateUser={props.updateUser}
                                  userProfile={props.userProfile} myPage={role}/>
                        <UserDescription updateUser={props.updateUser} userProfile={props.userProfile}
                                         myPage={role}/>
                        {role && <NavLink to={`/create/history`}>
                            <Button variant="outline-warning" className={style.button}>
                                + create new history
                            </Button>
                        </NavLink>}
                    </div>
                    <div className={styles.items}>
                        {items}
                    </div>
                </div>
            </div>
        )
    }

    export default Profile