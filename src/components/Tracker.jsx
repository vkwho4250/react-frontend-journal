import React from "react";
import "./Tracker.css";
import TrackerDots from "./TrackerDots";

function Tracker({ habit, dates, name }) {
   return (
      <div className="tracker-container">
         <div className="habit-name">{habit.habit}</div>
         <div className="tracker-dot-container">
            {dates.map((date, index) => {
               console.log(date);
               return (
                  <TrackerDots
                     key={index}
                     date={date}
                     habit={habit}
                     name={name}
                  />
               );
            })}
         </div>
      </div>
   );
}

export default Tracker;
