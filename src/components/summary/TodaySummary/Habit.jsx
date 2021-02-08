import React, { useState } from "react";
import "./Habit.css";

function Habit({ todayString, habit, displayHabit, editHabit, action }) {
   const [isComplete, setIsComplete] = useState(false);

   function changeIsComplete() {
      if (action === "CheckOff") {
         setIsComplete(!isComplete);
      }
   }

   let todayPosition = habit.dates.findIndex((date) => date === todayString);

   return (
      <div className="habit-box">
         <div
            onClick={editHabit}
            name="Edit"
            className={
               "habit-checkbox" +
               (action === "Edit" ? " editmode" : "") +
               (habit.completed[todayPosition] ? " completed" : "")
            }
         >
            <p
               onClick={changeIsComplete}
               onMouseEnter={displayHabit}
               onMouseLeave={displayHabit}
               status={String(!isComplete)}
               name="completed"
               value={habit.id}
               habit={habit.habit}
               className={action === "Edit" ? " editmode" : ""}
            >
               {habit.abbr}
            </p>
         </div>
      </div>
   );
}

export default Habit;
