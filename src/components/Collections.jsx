import React, { useState, useEffect } from "react";
import "./Collections.css";
import List from "./List";
import Dropdown from "./Dropdown";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

function Collections({
   // Variables
   todayString,
   allItems,
   newItem,
   setNewItem,
   itemType,
   setItemType,
   itemsOverflow,
   createDisplay,
   action,
   //Functions
   itemsInList,
   addItem,
   removeItem,
   editItem,
   optionSelected,
   changeCreateDisplay,
}) {
   // > ==== =====================

   // const todayString = today.toISOString().substring(0, 10);

   // const [itemsOverflow, setItemsOverflow] = useState(false);
   // const [createDisplay, setCreateDisplay] = useState(false);
   // const [itemType, setItemType] = useState("general");
   // const [suggestionDisplay, setSuggestionDisplay] = useState(false);
   // const [action, setAction] = useState("Add");
   // const [newItem, setNewItem] = useState({
   //    id: allItems.length,
   //    type: "general",
   //    category: "",
   //    content: "",
   //    date: todayString,
   // });

   // function itemsInList(listTitle) {
   //    console.log("itemsInList");

   //    return allItems.filter((item) => {
   //       return item.category === listTitle;
   //    });
   // }

   // function editItem(itemID) {
   //    setAction("Submit Edit");
   //    setCreateDisplay(true);
   //    setItemType(allItems[itemID].type);

   //    setNewItem({
   //       id: itemID,
   //       type: allItems[itemID].type,
   //       category: allItems[itemID].category,
   //       content: allItems[itemID].content,
   //       date: allItems[itemID].date,
   //    });
   // }

   // function addItem(event) {
   //    console.log(allItems);
   //    if (newItem.content.trim() === "") {
   //       document.querySelector(".input-content").classList.add("empty-input");
   //    } else if (newItem.category.trim() === "") {
   //       document
   //          .querySelector(".input-content")
   //          .classList.remove("empty-input");
   //       document.querySelector(".input-category").classList.add("empty-input");
   //    } else {
   //       document
   //          .querySelector(".input-content")
   //          .classList.remove("empty-input");
   //       document
   //          .querySelector(".input-category")
   //          .classList.remove("empty-input");

   //       setAllItems((prevItems) => {
   //          if (action === "Add") {
   //             return [...prevItems, newItem];
   //          } else {
   //             let temp = [...prevItems];
   //             temp[newItem.id] = newItem;
   //             return [...temp];
   //          }
   //       });

   //       setCreateDisplay(false);
   //       setAction("Add");
   //       setNewItem((prevValue) => ({
   //          id: prevValue.id + 1,
   //          todo: "general",
   //          category: "",
   //          content: "",
   //          date: todayString,
   //       }));
   //    }

   //    areItemsOverflowing();
   //    event.preventDefault();
   // }

   // function removeItem(itemID) {
   //    setAllItems((prevItems) => {
   //       return prevItems.filter((item) => {
   //          return item.id !== itemID;
   //       });
   //    });

   //    areItemsOverflowing();
   // }

   // function optionSelected(option) {
   //    setNewItem((prevContent) => {
   //       return {
   //          ...prevContent,
   //          ["category"]: option,
   //       };
   //    });
   // }

   // function changeCreateDisplay() {
   //    setCreateDisplay(!createDisplay);
   //    setNewItem({
   //       id: allItems.length,
   //       type: "general",
   //       category: "",
   //       content: "",
   //       date: todayString,
   //    });
   //    setItemType("general");
   // }

   // function areItemsOverflowing() {
   //    if (
   //       document.querySelector(".list-container").scrollHeight >
   //       document.querySelector(".list-container").offsetHeight
   //    ) {
   //       setItemsOverflow(true);
   //    } else {
   //       setItemsOverflow(false);
   //    }
   // }

   // > =========================

   //Collection

   const [moveUp, setMoveUp] = useState(false);
   const [headerDisplay, setHeaderDisplay] = useState("");
   const [suggestionDisplay, setSuggestionDisplay] = useState(false);

   const [categories, setCategories] = useState([]);

   useEffect(() => {
      listCategories();
   }, [allItems]);

   //! Need to change this function to adapt to other "groupings"
   function listCategories() {
      let temp = allItems.map((item) => item.category);
      temp.sort();

      setCategories([...new Set(temp)]);
   }

   function updateItem(event) {
      const { name, value } = event.target;

      if (name === "type") {
         setItemType(value);
      }

      setNewItem((prevContent) => {
         return {
            ...prevContent,
            [name]: value,
         };
      });

      // event.preventDefault();
      event.stopPropagation();
   }

   //* ===== DISPLAY CHANGES ====================================================
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
      <div id="collections">
         <div className="header">
            <div className={moveUp ? "move-up header-text" : "header-text"}>
               <h2>Collections</h2>
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
                  onMouseOver={changeHeaderDisplay}
                  className="btn-icon"
                  name="Edit categories"
               />
            </div>
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
               ></input>
               <input
                  className="input-category"
                  onChange={updateItem}
                  onFocus={showSuggestions}
                  onBlur={showSuggestions}
                  name="category"
                  value={newItem.category}
                  placeholder="Category"
               ></input>
               <Collapse in={suggestionDisplay}>
                  <div className="suggestions">
                     <ul>
                        {categories.map((category, index) => {
                           if (category !== "") {
                              return (
                                 <Dropdown
                                    key={index}
                                    option={category}
                                    optionSelected={optionSelected}
                                 />
                              );
                           }
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
            {categories.map((listTitle, index) => {
               let listItems = itemsInList(listTitle);
               return (
                  <List
                     key={index}
                     listTitle={listTitle}
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
