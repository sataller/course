import React from "react"
import styles from "./userPage.module.css"
import Item from "../MainPage/HistoryItems/Item/Item";
import {NavLink} from "react-router-dom";
import NavBarContainer from "../Navbar/NavbarContainet";

const UserPage = (props) => {

    let item = [
        {
            userId: 1,
            userName: "testUser1",
            title: "Мордор",
            description: " Склоны пепельных гор, шум из орочьих нор опустелый простор это мрачный Мордор.",
            genre: "фэнтези",
            tags: ["фэнтези", "фэндом"],
            lick: 3,
        },
        {
            userId: 2,
            userName: "testUser2",
            title: "Мордор",
            description: " Склоны пепельных гор, шум из орочьих нор опустелый простор это мрачный Мордор.",
            genre: "фэнтези",
            tags: ["фэнтези", "фэндом"],
            lick: 2,
        }
    ];

    const edit = () => {
        alert("edit")
    }

    const items = item.map(i => <Item userId={i.userId} key={i.userId} userName={i.userName}
                                      title={i.title} description={i.description}
                                      genre={i.genre} tags={i.tags} lick={i.lick}/>)

    return (
        <div className={styles.content}>
            <div className={styles.nav}>
                <NavBarContainer/>
            </div>
            <div className={styles.userInfo}>
                <div className={styles.author}>
                    <NavLink to={`/profile/${props.userId}`}>
                        <span>
                            {/*{props.userName}*/}
                            testUser1
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

export default UserPage