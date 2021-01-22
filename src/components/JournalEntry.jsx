import React, { useState, useEffect } from "react";
import "./JournalEntry.css";

import Mood from "./Mood";

function JournalEntry({
   entryId,
   todayFormatted,
   todayString,
   allMoods,
   // chosenMood,
   allAnimals,
   avatar,
}) {
   const [showMoodChoices, setShowMoodChoices] = useState(false);
   const [moodInFocus, setMoodFocus] = useState("");
   const [currentEntry, setCurrentEntry] = useState({
      id: entryId,
      title: "",
      date: todayString,
      content: "",
      mood: "neutral",
      reason: "",
   });

   function changeMoodFocus(event) {
      if (event.type === "mouseenter") {
         setMoodFocus(event.target.getAttribute("value"));
      } else {
         setMoodFocus("");
      }
   }

   // function selectMood(event) {
   //    console.log(event.currentTarget);
   //    setChosenMood(event.currentTarget.getAttribute("value"));
   // }

   function resetEntry() {
      setCurrentEntry({
         id: entryId,
         title: "",
         date: todayString,
         content: "",
         mood: "neutral",
         reason: "",
      });
   }

   function revealChoices() {
      setShowMoodChoices(!showMoodChoices);
   }

   function updateEntry(event) {
      console.log(currentEntry);
      console.log(event.target);
      console.log(event.currentTarget);

      const action = event.currentTarget.getAttribute("action");

      if (action !== "text update") {
         revealChoices();

         const name = event.currentTarget.getAttribute("name");
         const value = event.currentTarget.getAttribute("value");
         setCurrentEntry((prevValue) => {
            return {
               ...prevValue,
               [name]: value,
            };
         });
      } else {
         const { name, value } = event.target;

         console.log(name);
         console.log(value);
         setCurrentEntry((prevValue) => {
            return {
               ...prevValue,
               [name]: value,
            };
         });
      }

      event.stopPropagation();
   }

   return (
      <div className="journal-entry">
         <form>
            <h2>
               <input
                  className="input-entry entry-title"
                  onChange={updateEntry}
                  name="title"
                  value={currentEntry.title}
                  placeholder="Title"
                  action="text update"
               ></input>
            </h2>
            <h4 className="input-entry long-date">{todayFormatted}</h4>
            {/* <div className="text-container"> */}
            <textarea
               className="input-entry"
               name="content"
               onChange={updateEntry}
               value={currentEntry.content}
               rows="10"
               placeholder="Today..."
               action="text update"
            ></textarea>
            {/* </div> */}
            <div id="mood-container" className="input-entry">
               <p>{moodInFocus}</p>
               <div className="mood-tracker">
                  <div className="mood-indicators">
                     {allMoods.map((mood, index) => {
                        return (
                           <Mood
                              key={index}
                              mood={mood}
                              avatar={avatar}
                              changeMoodFocus={changeMoodFocus}
                              chosenMood={currentEntry.mood}
                              updateEntry={updateEntry}
                              action="select mood"
                              revealChoices={revealChoices}
                           />
                        );
                     })}
                  </div>
                  <div
                     className={
                        "mood-title" + (showMoodChoices ? " reveal" : "")
                     }
                  >
                     <Mood
                        key="currentMood"
                        mood={currentEntry.mood}
                        avatar={avatar}
                        changeMoodFocus={changeMoodFocus}
                        chosenMood={currentEntry.mood}
                        updateEntry={updateEntry}
                        action="reveal choices"
                        revealChoices={revealChoices}
                     />
                     <h3>Mood Tracker</h3>
                  </div>
               </div>
               {/* <div className="mood-description"> */}
               <textarea
                  className="input-entry entry-reason"
                  onChange={updateEntry}
                  name="reason"
                  value={currentEntry.reason}
                  placeholder="Why do you feel this way?"
                  action="text update"
               ></textarea>
               {/* </div> */}
            </div>
         </form>
      </div>
   );
}

export default JournalEntry;
