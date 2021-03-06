import React from "react";
import "./List.css";

import Item from "./Item";

function List({ listTitle, items, removeItem, editItem, showReport = false }) {
   return (
      <div className="list">
         <div>
            <h4>{listTitle}</h4>
         </div>
         <div className="items-display">
            <ul>
               {items.map((item, index) => {
                  return (
                     <Item
                        key={index}
                        content={item.content}
                        itemID={item.id}
                        itemType={item.type}
                        itemStatus={item.completed}
                        removeItem={removeItem}
                        editItem={editItem}
                        showReport={showReport}
                     />
                  );
               })}
            </ul>
         </div>
      </div>
   );
}

export default List;
