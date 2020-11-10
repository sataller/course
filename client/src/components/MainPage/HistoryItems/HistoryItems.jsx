import React from "react"
import styles from "./historyItems.module.css"
import Item from "./Item/Item";

const HistoryItems = (props) => {

    let item = [
        {
            userId: 1,
            userName: "testUser1",
            title: "Мордор",
            description: " Склоны пепельных гор, шум из орочьих нор опустелый простор это мрачный Мордор.",
            genre: "фэнтези",
            tags: ["фэнтези", "фэндом"],
            lick:3,
        },
        {
            userId: 2,
            userName: "testUser2",
            title: "Мордор",
            description: " Склоны пепельных гор, шум из орочьих нор опустелый простор это мрачный Мордор.",
            genre: "фэнтези",
            tags: ["фэнтези", "фэндом"],
            lick:2,
        }

    ];

    const items = item.map( i => <Item userId={i.userId} key={i.userId} userName={i.userName}
                                       title={i.title} description={i.description}
                                       genre={i.genre} tags={i.tags} lick={i.lick} />)

    return (
        <div className={styles.content}>
            {items}
        </div>
    )
}

export default HistoryItems