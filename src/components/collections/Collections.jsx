import React, { useState, useEffect } from "react";
import "./Collections.css";

import List from "../global/List";
import Dropdown from "../global/Dropdown";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

function Collections({
   // States
   todayString,
   frontPanel,
   allItems,
   newItem,
   setNewItem,
   itemType,
   setItemType,
   listGroups,
   itemsOverflow,
   createDisplay,
   groupingDisplay,
   action,
   //Functions
   filterItems,
   listGrouping,
   addItem,
   removeItem,
   editItem,
   optionSelected,
   changeCreateDisplay,
   changeGroupingDisplay,
}) {
   const [moveUp, setMoveUp] = useState(false);
   const [headerDisplay, setHeaderDisplay] = useState("");
   const [suggestionDisplay, setSuggestionDisplay] = useState(false);

   const [categories, setCategories] = useState([]);

   useEffect(() => {
      const categoryList = [
         ...new Set(allItems.map((item) => item["category"])),
      ];
      setCategories(categoryList.sort());
      listGrouping(listGroups.propertyName);
   }, [allItems]);

   function updateItem(event) {
      const { name, value } = event.target;

      if (name === "type") {
         setItemType(value);
      }

      setNewItem((prevValue) => {
         return {
            ...prevValue,
            [name]: value,
         };
      });

      event.stopPropagation();
   }

   function moveDisplayUp(event) {
      if (event.type === "mouseenter") {
         setMoveUp(true);
      } else {
         setMoveUp(false);
      }
   }

   function changeHeaderDisplay(event) {
      let content = event.currentTarget.getAttribute("name");
      setHeaderDisplay(content);
   }

   function showSuggestions() {
      setSuggestionDisplay(!suggestionDisplay);
   }

   return (
      <div
         id="collections"
         className={frontPanel === "collections" ? "show" : ""}
      >
         <div className="header">
            <div className={moveUp ? "move-up header-text" : "header-text"}>
               <h3>Collections</h3>
               <h3>{headerDisplay}</h3>
            </div>
            <div
               onMouseEnter={moveDisplayUp}
               onMouseLeave={moveDisplayUp}
               className="icon-container"
            >
               <AddIcon
                  onClick={changeCreateDisplay}
                  onMouseOver={changeHeaderDisplay}
                  className="btn-icon"
                  name="Add an item"
               />
               <EditIcon
                  onClick={changeGroupingDisplay}
                  onMouseOver={changeHeaderDisplay}
                  className="btn-icon"
                  name="Edit groupings"
               />
            </div>
         </div>

         <div
            className={
               "suggestions grouping-options" + (groupingDisplay ? " open" : "")
            }
         >
            <ExpandLessIcon
               onClick={changeGroupingDisplay}
               className="btn-icon create-close-btn"
            />
            <ul>
               {["category", "date", "type"].map((property, index) => {
                  return (
                     <Dropdown
                        key={index}
                        option={property}
                        optionSelected={optionSelected}
                        grouping={property}
                     />
                  );
               })}
            </ul>
         </div>

         <div className={"create-item" + (createDisplay ? " show" : "")}>
            <ExpandLessIcon
               onClick={changeCreateDisplay}
               className="btn-icon create-close-btn"
            />
            <form>
               <div className="input-type-container">
                  <input
                     type="radio"
                     id="radio-general"
                     className="input-radio general"
                     onChange={updateItem}
                     name="type"
                     value="general"
                     checked={itemType === "general" ? true : false}
                  ></input>
                  <label htmlFor="radio-general">General</label>
                  <input
                     type="radio"
                     id="radio-todo"
                     className="input-radio todo"
                     onChange={updateItem}
                     name="type"
                     value="todo"
                     checked={itemType === "todo" ? true : false}
                  ></input>
                  <label htmlFor="radio-todo">To Do</label>
                  <input
                     type="radio"
                     id="radio-event"
                     className="input-radio event"
                     onChange={updateItem}
                     name="type"
                     value="event"
                     checked={itemType === "event" ? true : false}
                  ></input>
                  <label htmlFor="radio-event">Event</label>
               </div>

               <input
                  className="input-content"
                  onChange={updateItem}
                  name="content"
                  value={newItem.content}
                  placeholder="Item"
                  minLength="1"
               ></input>
               <input
                  className="input-category"
                  onChange={updateItem}
                  onFocus={showSuggestions}
                  onBlur={showSuggestions}
                  name="category"
                  value={newItem.category}
                  placeholder="Category"
                  minLength="1"
               ></input>
               <Collapse in={suggestionDisplay}>
                  <div className="suggestions">
                     <ul>
                        {categories.map((category, index) => {
                           return (
                              <Dropdown
                                 key={index}
                                 option={category}
                                 optionSelected={optionSelected}
                                 grouping="category-suggestions"
                              />
                           );
                        })}
                     </ul>
                  </div>
               </Collapse>
               <input
                  className="input-date"
                  type="date"
                  min={todayString}
                  onChange={updateItem}
                  name="date"
                  value={newItem.date}
               ></input>
               <button className="create-btn" onClick={addItem}>
                  {action}
               </button>
            </form>
         </div>

         <div className="list-container">
            {listGroups.propertyValues.map((grouping, index) => {
               let listItems = filterItems(
                  allItems,
                  listGroups.propertyName,
                  grouping
               );
               return (
                  <List
                     key={index}
                     listTitle={grouping}
                     items={listItems}
                     removeItem={removeItem}
                     editItem={editItem}
                  />
               );
            })}
         </div>
         <div className="fade-indicator">
            <ExpandMoreIcon
               className={"btn-icon expand" + (itemsOverflow ? " show" : "")}
            />
         </div>
      </div>
   );
}

export default Collections;
