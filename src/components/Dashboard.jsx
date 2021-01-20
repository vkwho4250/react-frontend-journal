import React from "react";
import "./Dashboard.css";
import { ReactComponent as NightSky } from "./images/night-sky.svg";

import Collections from "./Collections";
import DatesBar from "./DatesBar";
import TodaySummary from "./TodaySummary";

function Dashboard({
   // Variables
   today,
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
   itemsInList,
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
            <TodaySummary
               allItems={allItems}
               setAllItems={setAllItems}
               habits={habits}
               setHabits={setHabits}
            />
         </div>
         <div className="ribbon">
            <div className="ribbon-tip"></div>
         </div>
         <DatesBar today={today} allItems={allItems} />

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
            itemsInList={itemsInList}
            addItem={addItem}
            removeItem={removeItem}
            editItem={editItem}
            optionSelected={optionSelected}
            changeCreateDisplay={changeCreateDisplay}
         />

         <div className="entries-container"></div>
      </div>
   );
}

export default Dashboard;
