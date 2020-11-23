import React from "react"
import Item from "./Item/Item";

const HistoryItems = (props) => {

    const items = props.histories.map(i => <Item id={i._id} key={i._id} name={i.name}
                                                 title={i.title} author={i.author} description={i.description}
                                                 rating={i.rating} tags={i.tags} like={i.like}
                                                 setUserHistories={props.setUserHistories}
                                                 authUser={props.authUser}
                                                 updateHistory={props.updateHistory}/>);

    return (
        <div>
            {items}
        </div>
    )
}

export default HistoryItems