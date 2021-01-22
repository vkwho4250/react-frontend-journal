import React, { useEffect, useState } from "react";
import "./Report.css";
import Dropdown from "./Dropdown";
import List from "./List";
import Mood from "./Mood";
import { ReactComponent as MoodSelector } from "./images/expressions.svg";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import JournalEntry from "./JournalEntry";

function Report({ avatar, allItems, entries, filterItems }) {
   const [allDates, setAllDates] = useState([]);
   const [thisDateTodos, setDateTodos] = useState([]);
   const [thisDateEvents, setDateEvents] = useState([]);
   const [thisDateEntry, setDateEntry] = useState("");
   const [dateDisplay, setDateDisplay] = useState(true);

   const [selectedDate, setSelectedDate] = useState("Pick a Date");

   useEffect(() => {
      const entryDates = entries.map((entry) => entry.date);
      const itemDates = allItems.map((item) => item.date);

      setAllDates([...new Set([...entryDates, ...itemDates].sort())]);
   }, [allItems, entries]);

   function changeDateDisplay(event) {
      console.log(event.currentTarget);
      if (event.currentTarget.getAttribute("name") === "Date Picker") {
         setDateDisplay(!dateDisplay);
      } else {
         setDateDisplay(false);
      }
   }

   const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
   };

   function dateSelected(grouping, date) {
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
         new Date(date).setHours(24, 0, 0, 0)
      );

      console.log(thisDateEntry);

      setDateDisplay(false);
      setSelectedDate(formattedDate);
      setDateTodos(
         filterItems(filterItems(allItems, "date", date), "type", "todo")
      );
      setDateEvents(
         filterItems(filterItems(allItems, "date", date), "type", "event")
      );

      const dateEntry = filterItems(entries, "date", date);
      if (dateEntry.length === 0) {
         setDateEntry("");
      } else {
         setDateEntry(filterItems(entries, "date", date)[0]);
      }
   }

   return (
      <div id="report">
         <div className="layout">
            <div className="header">
               <h1>Summary</h1>

               <div
                  onClick={changeDateDisplay}
                  className="date-picker"
                  name="Date Picker"
               >
                  <h1>{selectedDate}</h1>
               </div>
            </div>
            <div
               className={
                  "date-dropdown suggestions" + (dateDisplay ? " open" : "")
               }
            >
               <ExpandLessIcon
                  onClick={changeDateDisplay}
                  className="btn-icon create-close-btn"
               />
               <ul>
                  {allDates.map((date, index) => {
                     return (
                        <Dropdown
                           key={index}
                           option={date}
                           optionSelected={dateSelected}
                           grouping="date"
                        />
                     );
                  })}
               </ul>
            </div>
            <div className="summary-body">
               <div>
                  <List
                     listTitle="Events"
                     items={thisDateEvents}
                     removeItem=""
                     editItem=""
                  />
               </div>
               <div>
                  <List
                     listTitle="Items"
                     items={thisDateTodos}
                     removeItem=""
                     editItem=""
                  />
               </div>
               <div>
                  <div className="summary-entry list">
                     <div className="header">
                        <h3>
                           {thisDateEntry === ""
                              ? "Journal"
                              : thisDateEntry.title}
                        </h3>
                     </div>
                     <div className="text-container">
                        <p>
                           {thisDateEntry === ""
                              ? "No entry on this date."
                              : thisDateEntry.content}
                        </p>
                     </div>
                     <div
                        className={
                           thisDateEntry === "" ? " no-display" : "summary-mood"
                        }
                     >
                        <div
                           className={`mood-box ${thisDateEntry.mood} ${avatar} `}
                        >
                           <MoodSelector
                              className="svg-expression"
                              value={thisDateEntry.mood}
                              avatar={avatar}
                           />
                        </div>
                        <h3>Mood Tracker</h3>
                     </div>
                     <div className="summary-reason">
                        <p>{thisDateEntry.reason}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Report;
