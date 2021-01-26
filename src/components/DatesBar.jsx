import React, { useState, useEffect } from "react";
import "./DatesBar.css";
import Day from "./Day";

function DatesBar({ today, allItems, filterItems }) {
   const [todayMonth, todayDate, todayYear] = today
      .toLocaleDateString("en-US")
      .split("/");
   const lastDay = new Date(todayYear, todayMonth, 0).getDate();

   let dateArray = [];
   for (let i = 1; i <= lastDay; i++) {
      dateArray.push(new Date(todayYear, todayMonth - 1, i));
   }

   const [todoDates, setTodoDates] = useState([]);
   const [eventDates, setEventDates] = useState([]);

   useEffect(() => {
      setTodoDates(
         filterItems(allItems, "type", "todo").map((item) => item.date)
      );
      setEventDates(
         filterItems(allItems, "type", "event").map((item) => item.date)
      );
   }, [allItems]);

   return (
      // <div>
      <div id="dates-bar">
         {dateArray.map((date, index) => {
            return (
               <Day
                  key={index}
                  date={date}
                  todoDates={todoDates}
                  eventDates={eventDates}
               />
            );
         })}
      </div>
      // </div>
   );
}

export default DatesBar;
