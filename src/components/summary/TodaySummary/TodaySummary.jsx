import React, { useState, useEffect } from "react";
import "./TodaySummary.css";

import List from "../../global/List";
import Habit from "./Habit";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

function TodaySummary({
   // States
   todayString,
   allItems,
   habits,
   setHabits,
   // Actions
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
   const [displayWarning, setDisplayWarning] = useState(false);

   const [newHabit, setNewHabit] = useState({
      id: habits.length,
      habit: "",
      abbr: "",
      dates: [todayString],
      completed: [false],
   });

   function changeDisplayWarning(event) {
      setDisplayWarning(!displayWarning);
      event.preventDefault();
   }

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
      try {
         const habitID = event.target.getAttribute("value");

         if (action === "CheckOff") {
            habits[habitID].dates = [
               ...new Set([...habits[habitID].dates, todayString]),
            ];
            let indexToUpdate = habits[habitID].dates.findIndex(
               (date) => date === todayString
            );
            habits[habitID].completed[indexToUpdate] =
               "true" === event.target.getAttribute("status");
         } else {
            changeCreateDisplay(event);

            setNewHabit({
               id: habits[habitID].id,
               habit: habits[habitID].habit,
               abbr: habits[habitID].abbr,
               dates: habits[habitID].dates,
               completed: habits[habitID].completed,
            });
         }
      } catch (error) {
         console.log(error);
      }
   }

   function removeHabit(event) {
      setHabits((prevValue) => {
         return prevValue.filter((habit) => {
            return habit.id !== newHabit.id;
         });
      });

      changeDisplayWarning(!displayWarning);
      setHabitDisplay(!createHabit);
      setAction("CheckOff");
      event.preventDefault();
   }

   function addHabit(event) {
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
            dates: [todayString],
            completed: [false],
         }));
      }

      event.preventDefault();
   }

   function updateHabit(event) {
      const { name, value } = event.target;
      setNewHabit((prevValue) => {
         return {
            ...prevValue,
            [name]: value,
         };
      });

      event.stopPropagation();
   }

   function changeCreateDisplay(event) {
      setAction(event.currentTarget.getAttribute("name"));

      if (event.target.getAttribute("name") === "close-btn") {
         setHabitDisplay(!createHabit);
         setAction("CheckOff");
      } else if (!createHabit || action !== "Edit") {
         setHabitDisplay(!createHabit);
      }

      setNewHabit({
         id: habits.length,
         habit: "",
         abbr: "",
         dates: [todayString],
         completed: [false],
      });
   }

   return (
      <div id="today-container">
         <div id="habits-container">
            <div className="habit-header">
               <div className="indicator"></div>
               <h4>{(action === "Edit" ? "Edit " : "") + "Habits"}</h4>
               <div>
                  <AddIcon
                     onClick={changeCreateDisplay}
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
                        todayString={todayString}
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
         <div
            className="create-item"
            style={
               createHabit
                  ? {
                       top: `${
                          document.querySelector("#habits-container")
                             .clientHeight
                       }px`,
                    }
                  : {}
            }
         >
            <ExpandLessIcon
               onClick={changeCreateDisplay}
               className="btn-icon create-close-btn"
               name="close-btn"
            />
            <form>
               <input
                  className="input-habit"
                  onChange={updateHabit}
                  name="habit"
                  value={newHabit.habit}
                  placeholder="New Habit"
                  minLength="1"
               ></input>
               <input
                  className="input-abbr"
                  onChange={updateHabit}
                  name="abbr"
                  minLength="1"
                  maxLength="2"
                  value={newHabit.abbr}
                  placeholder="Abbreviation (max 2 char.)"
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
                     onClick={changeDisplayWarning}
                     className={
                        "create-btn " + (action !== "Add" ? "" : " no-display")
                     }
                  >
                     Delete
                  </button>
                  <div
                     className={
                        displayWarning ? "delete-warning" : "no-display"
                     }
                  >
                     <p>
                        All records of this habit will be removed. Please
                        confirm you want to proceed.
                     </p>
                     <div className="btn-container half">
                        <button onClick={removeHabit} className={"create-btn "}>
                           Confirm
                        </button>
                        <button
                           onClick={changeDisplayWarning}
                           className={"create-btn "}
                        >
                           Nevermind
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
         <div className="today-lists">
            <div>
               <div className="indicator event"></div>
               <List
                  key="todayEvent"
                  listTitle="Event"
                  items={eventItems}
                  removeItem={removeItem}
                  editItem={editItem}
               />
            </div>
            <div>
               <div className="indicator todo"></div>
               <List
                  key="todayTodo"
                  listTitle="To Do"
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
