import React from "react"
import styles from "./ItemInfo.module.css"
import NavBar from "../../../Navbar/Navbar";
import Item from "../Item/Item";
import Coments from "./Coments/Coments";
import Chapters from "./Coments/Chapters";

const ItemInfo = (props) => {

    let item = {
        userId: 1,
        userName: "testUser1",
        title: "Мордор",
        description: " Склоны пепельных гор, шум из орочьих нор опустелый простор это мрачный Мордор.",
        genre: "фэнтези",
        tags: ["фэнтези", "фэндом"],
        lick: 3,
    }

    return (
        <div className={styles.content}>
            <div className={styles.nav}><NavBar/></div>
            <div className={styles.item}><Item {...item} /></div>
            <div className={styles.chapter}><Chapters/></div>
            <div className={styles.coment}><Coments/></div>
        </div>
    )
}

export default ItemInfo