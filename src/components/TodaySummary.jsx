import React from "react";
import "./TodaySummary.css";

import List from "./List";
import Item from "./Item";

function TodaySummary({ allItems, setAllItems, habits, setHabits }) {
   return (
      <div id="summary-container">
         <div id="habits-container">
            <h4>Habits</h4>
            <div className="habit-indicators">
               <div className="habit"></div>
               <div>s</div>
               <div>s</div>
               <div>s</div>
            </div>
         </div>
         <div id="event-container"></div>
      </div>
   );
}

export default TodaySummary;
