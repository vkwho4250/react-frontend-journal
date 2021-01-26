import React from "react";
import "./Tracker.css";

import TrackerDots from "./TrackerDots";

function Tracker({ habit, dates, name }) {
   function printOut() {
      if (name === "habit-title") {
         return (
            <TrackerDots key={habit.id} date="" habit={habit} name={name} />
         );
      } else {
         return dates.map((date, index) => {
            return (
               <TrackerDots key={index} date={date} habit={habit} name={name} />
            );
         });
      }
   }

   return (
      <div className="tracker-container">
         <div className="tracker-dot-container">{printOut()}</div>
      </div>
   );
}

export default Tracker;
