import React from "react";
import "./Calendar.css";

function Calendar() {
   const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
   };

   const today = new Date();
   const currentMonth = today.getMonth() + 1;
   const currentYear = today.getFullYear();

   // new Intl.DateTimeFormat("en-US", options).format(today.getMonth() + 1);

   const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

   console.log(today);
   console.log(lastDay);
   console.log(currentMonth);
   console.log(currentYear);

   return (
      <div id="calendar">
         <div className="calendar-grid">
            <div className="start-filler"></div>

            <div className="end-filler"></div>
         </div>
      </div>
   );
}

export default Calendar;
