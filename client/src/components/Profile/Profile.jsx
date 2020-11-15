import React from "react"
import styles from "./Profile.module.css"
import Item from "../MainPage/HistoryItems/Item/Item";
import {NavLink} from "react-router-dom";
import NavBarContainer from "../Navbar/NavbarContainet";
import Preloader from "../common/Preloader/Preloader";

const Profile = (props) => {
    const edit = () => {
        alert("edit")
    }
    const items = props.histories.map(i => <Item id={i._id} key={i._id} name={i.name}
                                                 title={i.title} author={i.author} description={i.description}
                                                 genre={i.genre} tags={i.tags} like={i.like}/>)
if(!props.userProfile){
    return <Preloader/>
}
    return (
        <div className={styles.content}>
            <div className={styles.nav}>
                <NavBarContainer/>
            </div>
            <div className={styles.userInfo}>
                <div className={styles.author}>
                    <NavLink to={`/profile/${props.userProfile.id}`}>
                        <span>
                            {props.userProfile.name}
                        </span>
                    </NavLink>
                </div>
                <div>
                    <span> О себе:</span>
                    <div>
                        <span onDoubleClick={edit}>
Не сказать, что я грамотей, но сочинять истории мне
это не мешает, хотя есть другое препятствие на моем пути и имя ей Лень.
Сочинить то сочиню, но не факт, что напечатаю))0)
                    </span>
                    </div>
                </div>
            </div>
            <div className={styles.items}>
                {items}
            </div>
        </div>
    )
}

export default Profile