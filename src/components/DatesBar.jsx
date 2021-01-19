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

   useEffect(() => {
      let todoArray = allItems.map((item) => item.deadline);
      setTodoDates([...new Set(todoArray)]);
   }, [allItems]);

   return (
      <div id="dates-bar">
         {dateArray.map((date, index) => {
            return <Day key={index} date={date} todoDates={todoDates} />;
         })}
      </div>
   );
}

export default DatesBar;
