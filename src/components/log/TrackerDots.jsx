import React from "react";

function TrackerDots({ date, habit, name }) {
   function typeOfBox() {
      if (name === "display") {
         return "tracker-dates-box";
      } else if (name === "habit") {
         return "tracker-dot-box";
      } else {
         return "tracker-habit-title";
      }
   }

   return (
      <div className={typeOfBox()}>
         <p
            className={`tracker-habit-title ${
               name === "habit-title" ? "" : "no-display"
            }`}
         >
            {habit.abbr}
         </p>
         <p
            className={`tracker-date-display ${
               name === "display" ? "" : "no-display"
            }`}
         >
            {date}
         </p>
         <div
            className={`indicator ${name === "habit" ? "" : "no-display"} ${
               habit.dates.includes(date) &&
               habit.completed[habit.dates.indexOf(date)]
                  ? "filled"
                  : ""
            }`}
         ></div>
      </div>
   );
}

export default TrackerDots;
