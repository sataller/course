import React from "react"
import preloader from "../../../assets/preloader1.svg"
import style from "./preloader.module.css"

const Preloader = (props) => {
   return (
       <div className={style.preload}>
           <img src={preloader} />
       </div>
   )
}

export default Preloader