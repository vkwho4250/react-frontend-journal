import React, { useState, useEffect } from "react";
import "./DatesBar.css";
import Day from "./Day";

function DatesBar({ today, allItems }) {
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
      allItems.forEach((item) => {
         if (item.type === "todo") {
            setTodoDates((prevValues) => [...prevValues, item.date]);
         } else {
            setEventDates((prevValues) => [...prevValues, item.date]);
         }
      });

      setTodoDates((prevValues) => [...new Set(prevValues)]);
      setEventDates((prevValues) => [...new Set(prevValues)]);
   }, [allItems]);

   return (
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
   );
}

export default DatesBar;
