import React, { useState } from "react";
import "./Item.css";

import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";

function Item({ content, itemID, listTitle, removeItem, editItem }) {
   const [isDone, setDoneStatus] = useState(false);

   function changeDoneStatus() {
      setDoneStatus(!isDone);
   }

   function deleteItem() {
      console.log(itemID);
      removeItem(itemID);
   }

   function updateItem() {
      editItem(itemID);
   }
   return (
      <div className="list-item">
         <li>
            <p className={isDone ? "item-done" : ""}>{content}</p>
            <div className="item-icon-container">
               <CheckIcon
                  onClick={changeDoneStatus}
                  className="btn-icon item-icon check"
               />
               <EditIcon
                  onClick={updateItem}
                  className="btn-icon item-icon edit"
               />
               <ClearIcon
                  onClick={deleteItem}
                  className="btn-icon item-icon clear"
               />
            </div>
         </li>
      </div>
   );
}

export default Item;
