import React, { useState, useEffect } from "react";
import "./ToDos.css";
import ToDoList from "./ToDoList";
import Dropdown from "./Dropdown";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

function ToDos({ today, allItems, setAllItems }) {
   const todayString = today.toISOString().substring(0, 10);

   const [suggestionDisplay, setSuggestionDisplay] = useState(false);
   const [itemsOverflow, setItemsOverflow] = useState(false);
   const [createDisplay, setCreateDisplay] = useState(false);
   const [moveUp, setMoveUp] = useState(false);
   const [headerDisplay, setHeaderDisplay] = useState("");
   const [action, setAction] = useState("Add");

   const [newItem, setNewItem] = useState({
      id: 0,
      category: "",
      content: "",
      deadline: todayString,
   });

   // const [allItems, setAllItems] = useState([
   //    {
   //       id: 0,
   //       category: "shop1",
   //       content: "This is a test for T1",
   //       deadline: new Date(2021, 1, 22),
   //    },
   //    {
   //       id: 1,
   //       category: "shop2",
   //       content: "This is a test for T2",
   //       deadline: new Date(2021, 1, 25),
   //    },
   //    {
   //       id: 2,
   //       category: "shop2",
   //       content:
   //          "This is a long test for T2.This is a long test for T2.This is a long test for T2.This is a long test for T2. ",
   //       deadline: new Date(2021, 1, 26),
   //    },
   //    {
   //       id: 3,
   //       category: "sdf",
   //       content: "This is a long test for T4",
   //       deadline: new Date(2021, 1, 26),
   //    },
   // ]);

   const [categories, setCategories] = useState([""]);

   useEffect(() => {
      listCategories();
   }, [allItems]);

   function listCategories() {
      let temp = [];

      allItems.map((item) => {
         temp.push(item.category);
      });

      setCategories([...new Set(temp)]);
   }

   function itemsInCategory(category) {
      console.log("itemsInCategory");
      return allItems.filter((item) => {
         return item.category === category;
      });
   }

   function editItem(itemID) {
      setAction("Submit Edit");
      setCreateDisplay(true);

      setNewItem({
         id: itemID,
         category: allItems[itemID].category,
         content: allItems[itemID].content,
         deadline: allItems[itemID].deadline,
      });
   }

   function addItem(event) {
      if (newItem.content.trim() === "") {
         document.querySelector(".input-content").classList.add("empty-input");
      } else if (newItem.category.trim() === "") {
         document
            .querySelector(".input-content")
            .classList.remove("empty-input");
         document.querySelector(".input-category").classList.add("empty-input");
      } else {
         setAllItems((prevItems) => {
            if (action === "Add") {
               return [...prevItems, newItem];
            } else {
               let temp = [...prevItems];
               temp[newItem.id] = newItem;
               return [...temp];
            }
         });

         setCreateDisplay(false);
         setAction("Add");
         setNewItem({
            id: allItems.length + 1,
            category: "",
            content: "",
            deadline: todayString,
         });
      }

      areItemsOverflowing();
      event.preventDefault();
   }

   function removeItem(itemID) {
      setAllItems((prevItems) => {
         return prevItems.filter((item) => {
            return item.id !== itemID;
         });
      });

      areItemsOverflowing();
   }

   function updateItem(event) {
      const { name, value } = event.target;
      setNewItem((prevContent) => {
         return {
            ...prevContent,
            [name]: value,
         };
      });

      event.preventDefault();
   }

   function optionSelected(option) {
      setNewItem((prevContent) => {
         return {
            ...prevContent,
            ["category"]: option,
         };
      });
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

   function changeCreateDisplay() {
      setCreateDisplay(!createDisplay);
   }

   function showSuggestions() {
      setSuggestionDisplay(!suggestionDisplay);
   }

   function areItemsOverflowing() {
      if (
         document.querySelector(".list-container").scrollHeight >
         document.querySelector(".list-container").offsetHeight
      ) {
         setItemsOverflow(true);
      } else {
         setItemsOverflow(false);
      }
   }

   return (
      <div id="todolist">
         <div className="header">
            <div className={moveUp ? "move-up header-text" : "header-text"}>
               <h2>To Dos</h2>
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
               <input
                  className="input-content"
                  onChange={updateItem}
                  name="content"
                  value={newItem.content}
                  placeholder="Task"
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
                  className="input-deadline"
                  type="date"
                  min={today.toISOString().slice(0, 10)}
                  onChange={updateItem}
                  name="deadline"
                  value={newItem.deadline}
                  placeholder="Deadline"
               ></input>
               <button className="create-btn" onClick={addItem}>
                  {action}
               </button>
            </form>
         </div>

         <div className="list-container">
            {categories.map((category, index) => {
               let categoryItems = itemsInCategory(category);
               return (
                  <ToDoList
                     key={index}
                     category={category}
                     items={categoryItems}
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

export default ToDos;
