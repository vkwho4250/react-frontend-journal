import React, { useState } from "react";
import "./Habit.css";

import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";

function Habit({
   habit,
   displayHabit,
   habitInFocus,
   updateHabit,
   editHabit,
   action,
}) {
   const [isComplete, setIsComplete] = useState(false);

   console.log(action);

   function changeIsComplete() {
      console.log("entering changeISComplet");
      if (action === "checkoff") {
         setIsComplete(!isComplete);
      }
   }

   //    function callEdit() {
   //       editHabit(habit.id);
   //    }

   return (
      <div className="habit-box">
         <div
            onClick={editHabit}
            name="Edit"
            className={
               "habit-checkbox" + (action === "Edit" ? " editmode" : "")
            }
         >
            <p
               onClick={changeIsComplete}
               onMouseEnter={displayHabit}
               onMouseLeave={displayHabit}
               status={String(!isComplete)}
               name="completed"
               value={habit.id}
               className={action === "Edit" ? " editmode" : ""}
            >
               {habit.abbr}
            </p>
         </div>

         {/* <div className="icon-container">
            <EditIcon className="btn-icon" />
            <ClearIcon className="btn-icon" />
         </div> */}
      </div>
   );
}

export default Habit;
