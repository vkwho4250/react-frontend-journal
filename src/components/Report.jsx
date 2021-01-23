import React, { useEffect, useState } from "react";
import "./Report.css";
import Dropdown from "./Dropdown";
import List from "./List";
import Mood from "./Mood";
import { ReactComponent as MoodSelector } from "./images/expressions.svg";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import JournalEntry from "./JournalEntry";
import Tracker from "./Tracker";

function Report({
   today,
   avatar,
   allItems,
   entries,
   filterItems,
   habits,
   showReport,
}) {
   const [allDates, setAllDates] = useState([]);
   const [thisDateTodos, setDateTodos] = useState([]);
   const [thisDateEvents, setDateEvents] = useState([]);
   const [thisDateEntry, setDateEntry] = useState("");
   const [dateDisplay, setDateDisplay] = useState(true);
   const [trackerDates, setTrackerDates] = useState([]);

   const [selectedDate, setSelectedDate] = useState("Pick a Date");

   useEffect(() => {
      const entryDates = entries.map((entry) => entry.date);
      const itemDates = allItems.map((item) => item.date);
      const combinedDates = [...new Set([...entryDates, ...itemDates].sort())];

      setTrackerDates(
         settingDates(new Date(combinedDates[0]).setHours(24, 0, 0, 0), today)
      );
      setAllDates(combinedDates);
   }, [allItems, entries, habits]);

   function settingDates(startDate, endDate) {
      const allDates = new Array();
      const date = new Date(startDate);
      while (date <= endDate) {
         allDates.push(new Date(date).toISOString().substring(0, 10));
         date.setDate(date.getDate() + 1);
      }
      return allDates;
   }

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
      <div id="report" className={showReport ? "open" : ""}>
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
               <div className="summary-items">
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
                        listTitle="To Dos"
                        items={thisDateTodos}
                        removeItem=""
                        editItem=""
                     />
                  </div>
               </div>
               <div className="summary-journal">
                  <div className="summary-entry list">
                     <div className="summary-entry-header">
                        <h3>
                           {thisDateEntry === ""
                              ? "Journal"
                              : thisDateEntry.title}
                        </h3>
                     </div>
                     <div className="entry-content">
                        <p>
                           {thisDateEntry === ""
                              ? "No entry on this date."
                              : thisDateEntry.content}
                        </p>
                     </div>
                     <div style={{ border: "1rem solid green" }}>
                        <div
                           className={
                              thisDateEntry === ""
                                 ? " no-display"
                                 : "summary-mood"
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
            <div className="habit-tracker">
               <h4>Habit Tracker</h4>
               <div className="habit-bar">
                  <div className="habit-trend scrollbar">
                     <div className="habit-date-bar">
                        <Tracker
                           key="dates"
                           habit={{ habit: "", dates: trackerDates }}
                           dates={trackerDates}
                           name="display"
                        />
                     </div>

                     {habits.map((habit, index) => {
                        console.log(trackerDates);
                        return (
                           <Tracker
                              key={index}
                              habit={habit}
                              dates={trackerDates}
                              name="habit"
                           />
                        );
                     })}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Report;
