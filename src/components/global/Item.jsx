import React from "react";
import "./Item.css";

import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

function Item({
   content,
   itemID,
   itemType,
   itemStatus,
   removeItem,
   editItem,
   showReport,
}) {
   function changeDoneStatus() {
      editItem(itemID, "status");
   }

   function deleteItem() {
      removeItem(itemID);
   }

   function updateItem() {
      editItem(itemID, "content");
   }

   return (
      <div className="list-item">
         <li>
            <FiberManualRecordIcon
               className={
                  "btn-icon type-icon" +
                  (itemType === "general" ? " invisible" : "")
               }
            />
            <EventOutlinedIcon
               className={
                  "btn-icon type-icon" +
                  (itemType === "event" ? " selected" : "")
               }
            />
            <AssignmentOutlinedIcon
               className={
                  "btn-icon type-icon" +
                  (itemType === "todo" ? " selected" : "")
               }
            />
            <p
               onClick={showReport ? null : changeDoneStatus}
               className={itemStatus ? "item-done" : ""}
            >
               {content}
            </p>

            <div className="item-icon-container">
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
