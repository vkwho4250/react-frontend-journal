import React, { useState, useEffect } from "react";
import "./TodaySummary.css";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import List from "./List";
import Item from "./Item";
import Habit from "./Habit";

function TodaySummary({
   // Variables
   todayString,
   allItems,
   habits,
   setHabits,
   // Functions
   filterItems,
   removeItem,
   editItem,
}) {
   const [todoItems, setTodoItems] = useState([]);
   const [eventItems, setEventItems] = useState([]);
   const [action, setAction] = useState("CheckOff");

   useEffect(() => {
      let temp = filterItems(allItems, "date", todayString);
      setTodoItems(filterItems(temp, "type", "todo"));
      setEventItems(filterItems(temp, "type", "event"));
   }, [allItems]);

   // > ============ HANDLING HABITS ====================================

   const [createHabit, setHabitDisplay] = useState(false);
   const [habitInFocus, setHabitInFocus] = useState("");

   const [newHabit, setNewHabit] = useState({
      id: habits.length,
      habit: "",
      abbr: "",
      tracker: [
         {
            date: todayString,
            completed: false,
         },
      ],
   });

   function displayHabit(event) {
      if (event.type === "mouseenter") {
         setHabitInFocus(event.currentTarget.getAttribute("habit"));
      } else {
         setHabitInFocus("");
      }
   }

   function enterEditMode() {
      setAction("Edit");
   }

   function editHabit(event) {
      const habitID = event.target.getAttribute("value");

      const updatedTracker = habits[habitID].tracker;

      if (action === "CheckOff") {
         console.log(updatedTracker);

         updatedTracker.push({
            date: todayString,
            completed: event.currentTarget.getAttribute("status"),
         });

         setNewHabit({
            id: habitID,
            habit: habits[habitID].habit,
            abbr: habits[habitID].abbr,
            tracker: updatedTracker,
         });

         setHabits((prevHabits) => {
            let temp = [...prevHabits];
            temp[newHabit.id] = newHabit;
            return [...temp];
         });

         setNewHabit({
            id: habits.length + 1,
            habit: "",
            abbr: "",
            tracker: [
               {
                  date: todayString,
                  completed: false,
               },
            ],
         });
      } else {
         changeCreateDisplay(event);

         setNewHabit({
            id: habitID,
            habit: habits[habitID].habit,
            abbr: habits[habitID].abbr,
            tracker: updatedTracker,
         });
      }
   }

   function addHabit(event) {
      console.log(habits);
      console.log(newHabit.abbr === "");

      if (newHabit.habit.trim() === "") {
         document.querySelector(".input-habit").classList.add("empty-input");
      } else if (newHabit.abbr === "") {
         document.querySelector(".input-habit").classList.remove("empty-input");
         document.querySelector(".input-abbr").classList.add("empty-input");
      } else {
         document.querySelector(".input-habit").classList.remove("empty-input");
         document.querySelector(".input-abbr").classList.remove("empty-input");

         setHabits((prevHabits) => {
            if (action === "Add") {
               return [...prevHabits, newHabit];
            } else {
               let temp = [...prevHabits];
               temp[newHabit.id] = newHabit;
               return [...temp];
            }
         });

         setHabitDisplay(false);
         setAction("CheckOff");
         setNewHabit((prevValue) => ({
            id: prevValue.id + 1,
            habit: "",
            abbr: "",
            tracker: [
               {
                  date: todayString,
                  completed: false,
               },
            ],
         }));
      }

      event.preventDefault();
   }

   function updateHabit(event) {
      const { name, value } = event.target;
      // console.log(event.target);

      // const name = event.target.getAttrribute("name");
      // const value = event.target.getAttrribute("name");

      if (name === "completed") {
         console.log(event.target.getAttribute("status"));

         const status = event.target.getAttrribute("status");
      } else {
         setNewHabit((prevValue) => {
            return {
               ...prevValue,
               [name]: value,
            };
         });

         event.stopPropagation();
      }
   }

   function changeCreateDisplay(event) {
      console.log(event.currentTarget);
      setAction(event.currentTarget.getAttribute("name"));
      setHabitDisplay(!createHabit);
      setNewHabit({
         id: habits.length,
         habit: "",
         abbr: "",
         tracker: [
            {
               date: todayString,
               completed: false,
            },
         ],
      });
   }

   return (
      <div id="today-container">
         <div id="habits-container">
            <div className="habit-header">
               <h4>{(action === "Edit" ? "Edit " : "") + "Habits"}</h4>
               <div>
                  <AddIcon
                     onClick={changeCreateDisplay}
                     // onMouseOver={changeHeaderDisplay}
                     className="btn-icon habits-icon"
                     name="Add"
                  />
                  <EditIcon
                     onClick={enterEditMode}
                     className="btn-icon habits-icon"
                     name="Edit"
                  />
               </div>
            </div>

            <div className="habit-indicators">
               {habits.map((habit, index) => {
                  return (
                     <Habit
                        key={index}
                        habit={habit}
                        displayHabit={displayHabit}
                        habitInFocus={habitInFocus}
                        updateHabit={updateHabit}
                        editHabit={editHabit}
                        action={action}
                     />
                  );
               })}
            </div>
            <div className={"habit-text"}>{habitInFocus}</div>
         </div>
         <div className={"create-item" + (createHabit ? " open" : "")}>
            <ExpandLessIcon
               onClick={changeCreateDisplay}
               className="btn-icon create-close-btn"
            />
            <form>
               <input
                  className="input-habit"
                  onChange={updateHabit}
                  name="habit"
                  value={newHabit.habit}
                  placeholder="Enter Habit"
                  minLength="1"
               ></input>
               <input
                  className="input-abbr"
                  onChange={updateHabit}
                  name="abbr"
                  minLength="1"
                  maxLength="2"
                  value={newHabit.abbr}
                  placeholder="Max 2 characters abbreviation"
               ></input>
               <div
                  className={
                     action !== "Add" ? "btn-container half" : "btn-container"
                  }
               >
                  <button onClick={addHabit} className="create-btn">
                     {action}
                  </button>
                  <button
                     // onClick={removeHabit}
                     className={
                        "create-btn " + (action !== "Add" ? "" : " delete-btn")
                     }
                  >
                     Delete
                  </button>
               </div>
            </form>
         </div>
         <div className="today-lists">
            <div>
               <List
                  key="todayEvent"
                  listTitle="Events"
                  items={eventItems}
                  removeItem={removeItem}
                  editItem={editItem}
               />
            </div>
            <div>
               <List
                  key="todayTodo"
                  listTitle="To Dos"
                  items={todoItems}
                  removeItem={removeItem}
                  editItem={editItem}
               />
            </div>
         </div>
      </div>
   );
}

export default TodaySummary;
