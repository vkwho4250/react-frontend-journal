import React from "react";
import "./ToDoList.css";
import Item from "./Item";

function ToDoList({ category, items, removeItem, editItem }) {
   return (
      <div className="list">
         <div>
            <h4>{category}</h4>
         </div>
         <div className="items-display">
            <ul>
               {items.map((item, index) => {
                  return (
                     <Item
                        key={index}
                        content={item.content}
                        itemID={item.id}
                        removeItem={removeItem}
                        editItem={editItem}
                     />
                  );
               })}
            </ul>
         </div>
      </div>
   );
}

export default ToDoList;
