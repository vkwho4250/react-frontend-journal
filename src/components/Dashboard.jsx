import React from "react";
import "./Dashboard.css";
import { ReactComponent as NightSky } from "./images/night-sky.svg";

import ToDos from "./ToDos";

function Dashboard() {
   const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
   };

   const today = new Date();
   const currentWeekday = Intl.DateTimeFormat("en-US", {
      weekday: "long",
   }).format(today.getDay());

   const todayFormatted = new Intl.DateTimeFormat("en-US", options).format(
      today
   );

   return (
      <div id="dashboard">
         <div className="todos-container">
            <ToDos today={today} />
         </div>
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

         <div className="entries-container"></div>
      </div>
   );
}

export default Dashboard;
