import React from "react";

function TrackerDots({ date, habit, name }) {
   console.log(name === "display");
   console.log(date);
   return (
      <div
         className={
            name === "display" ? "tracker-dates-box" : "tracker-dot-box"
         }
      >
         <p
            className={`tracker-date-display ${
               name === "display" ? "" : "no-display"
            }`}
         >
            {date}
         </p>
         <div
            className={`indicator ${name === "display" ? "no-display" : ""} ${
               habit.dates.includes(date) ? "filled" : ""
            }`}
         ></div>
      </div>
   );
}

export default TrackerDots;
