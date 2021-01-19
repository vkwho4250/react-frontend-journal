import React from "react";
import "./Dashboard.css";
import { ReactComponent as NightSky } from "./images/night-sky.svg";

import ToDos from "./ToDos";
import DatesBar from "./DatesBar";

function Dashboard({ today, allItems, setAllItems }) {
   const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
   };

   const currentWeekday = Intl.DateTimeFormat("en-US", {
      weekday: "long",
   }).format(today.getDay());

   const todayFormatted = new Intl.DateTimeFormat("en-US", options).format(
      today
   );

   return (
      <div id="dashboard">
         <div className="summary-container">
            <div className="circle-container">
               <div className="circle-img">
                  <NightSky className="night-sky" />
               </div>
            </div>
            <div className="date-display">
               <h2>{currentWeekday}</h2>
               <h1>{todayFormatted}</h1>
            </div>
         </div>
         <div className="ribbon">
            <div className="ribbon-tip"></div>
         </div>
         <DatesBar today={today} allItems={allItems} />

         <ToDos today={today} allItems={allItems} setAllItems={setAllItems} />

         <div className="entries-container"></div>
      </div>
   );
}

export default Dashboard;
