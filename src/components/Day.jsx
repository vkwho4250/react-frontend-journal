import React, { useState, useEffect } from "react";
import "./Day.css";

function Day({ date, todoDates }) {
   const dayLetter = ["S", "M", "T", "W", "T", "F", "S"];

   const stringDate = date.toISOString().substring(0, 10);

   const [hasTodo, setHasTodo] = useState(false);

   useEffect(() => {
      checkForTodos();
   }, [hasTodo]);

   function checkForTodos() {
      if (todoDates.includes(stringDate)) {
         setHasTodo(true);
      }
   }

   return (
      <div className="day-container">
         <div>
            <p>{dayLetter[date.getDay()]}</p>
         </div>
         <div>
            <p>{date.getDate()}</p>
         </div>

         <div>
            <div className={"indicator" + (hasTodo ? " task" : "")}></div>
         </div>
      </div>
   );
}

export default Day;
