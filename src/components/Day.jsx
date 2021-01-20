import React, { useState, useEffect } from "react";
import "./Day.css";

function Day({ date, todoDates, eventDates }) {
   const dayLetter = ["S", "M", "T", "W", "T", "F", "S"];

   const stringDate = date.toISOString().substring(0, 10);

   const [hasTodo, setHasTodo] = useState(false);
   const [hasEvent, setHasEvent] = useState(false);

   useEffect(() => {
      todoDates.includes(stringDate) ? setHasTodo(true) : setHasTodo(false);
      eventDates.includes(stringDate) ? setHasEvent(true) : setHasEvent(false);
   }, [todoDates]);

   return (
      <div className="day-container">
         <div>
            <p>{dayLetter[date.getDay()]}</p>
         </div>
         <div>
            <p>{date.getDate()}</p>
         </div>

         <div>
            <div
               className={
                  "indicator" +
                  (hasTodo ? " todo" : "") +
                  (hasEvent ? " event" : "")
               }
            ></div>
         </div>
      </div>
   );
}

export default Day;
