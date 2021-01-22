import React, { useState } from "react";
import "./Dashboard.css";
import { ReactComponent as NightSky } from "./images/night-sky.svg";

import Collections from "./Collections";
import DatesBar from "./DatesBar";
import TodaySummary from "./TodaySummary";
import JournalEntry from "./JournalEntry";

function Dashboard({
   // Variables
   today,
   todayString,
   allMoods,
   chosenMood,
   setChosenMood,
   allAnimals,
   avatar,
   entries,
   setEntries,
   habits,
   setHabits,
   allItems,
   setAllItems,
   newItem,
   setNewItem,
   itemType,
   setItemType,
   itemsOverflow,
   createDisplay,
   action,
   // Functions
   filterItems,
   updateItem,
   addItem,
   removeItem,
   editItem,
   optionSelected,
   changeCreateDisplay,
}) {
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

   const [quickNotes, setQuickNotes] = useState("");

   function updateQuickNotes(event) {
      const { value } = event.target;
      setQuickNotes(value);

      // event.stopPropagation();
   }

   return (
      <div id="dashboard">
         <div className="summary-container">
            <div className="circle-container">
               <div className="circle-img">
                  <NightSky className="night-sky" />
               </div>
               <div className="date-display">
                  <h2>{currentWeekday}</h2>
                  <h1>{todayFormatted}</h1>
               </div>
            </div>

            <TodaySummary
               //Variables
               todayString={todayString}
               allItems={allItems}
               setAllItems={setAllItems}
               habits={habits}
               setHabits={setHabits}
               //Functions
               filterItems={filterItems}
               removeItem={removeItem}
               editItem={editItem}
            />
         </div>

         <div className="ribbon">
            <div className="ribbon-tip"></div>
         </div>
         <DatesBar
            today={today}
            allItems={allItems}
            filterItems={filterItems}
         />

         <Collections
            today={today}
            // States
            allItems={allItems}
            newItem={newItem}
            setNewItem={setNewItem}
            itemType={itemType}
            setItemType={setItemType}
            itemsOverflow={itemsOverflow}
            createDisplay={createDisplay}
            action={action}
            // Functions
            filterItems={filterItems}
            updateItem={updateItem}
            addItem={addItem}
            removeItem={removeItem}
            editItem={editItem}
            optionSelected={optionSelected}
            changeCreateDisplay={changeCreateDisplay}
         />

         <div id="journal-container">
            <div className="header">
               <h3>Journal</h3>
            </div>
            <div id="entry-container">
               <JournalEntry
                  key={entries.length + 1}
                  entryId={entries.length + 1}
                  todayFormatted={todayFormatted}
                  todayString={todayString}
                  allMoods={allMoods}
                  chosenMood={chosenMood}
                  setChosenMood={setChosenMood}
                  allAnimals={allAnimals}
                  avatar={avatar}
               />
            </div>
            <div id="quick-notes">
               <form>
                  <h4>Quick Notes</h4>
                  <textarea
                     id="textarea-notes"
                     name="quick-notes"
                     onChange={updateQuickNotes}
                     value={quickNotes}
                     rows="7"
                     columns="50"
                     placeholder="Notes notes notes..."
                  >
                     {quickNotes}
                  </textarea>
               </form>
            </div>
         </div>

         {/* <div id="quick-notes">
            <form>
               <h4>Quick Notes</h4>
               <textarea
                  id="textarea-notes"
                  name="quick-notes"
                  onChange={updateQuickNotes}
                  value={quickNotes}
                  rows="7"
                  columns="50"
                  placeholder="Notes notes notes..."
               >
                  {quickNotes}
               </textarea>
            </form>
         </div> */}
      </div>
   );
}

export default Dashboard;
