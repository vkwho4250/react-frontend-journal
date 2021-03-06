import React, { useState } from "react";
import "./JournalEntry.css";

import Mood from "./Mood";

import SaveIcon from "@material-ui/icons/Save";

function JournalEntry({
   todayFormatted,
   todayEntry,
   setEntries,
   allMoods,
   avatar,
}) {
   const [showMoodChoices, setShowMoodChoices] = useState(false);
   const [moodInFocus, setMoodFocus] = useState("");
   const [currentEntry, setCurrentEntry] = useState({
      id: todayEntry.id,
      title: todayEntry.title,
      date: todayEntry.date,
      content: todayEntry.content,
      mood: todayEntry.mood,
      reason: todayEntry.reason,
   });

   function changeMoodFocus(event) {
      if (event.type === "mouseenter") {
         setMoodFocus(event.target.getAttribute("value"));
      } else {
         setMoodFocus("");
      }
   }

   function submitEntry(event) {
      setEntries((prevValue) => {
         return [...prevValue.slice(0, todayEntry.id), currentEntry];
      });

      event.preventDefault();
   }

   function revealChoices() {
      setShowMoodChoices(!showMoodChoices);
   }

   function updateEntry(event) {
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
            <div className="entry-header">
               <h2>
                  <input
                     className="entry-title"
                     onChange={updateEntry}
                     name="title"
                     value={currentEntry.title}
                     placeholder="Title"
                     action="text update"
                  ></input>
               </h2>
               <SaveIcon onClick={submitEntry} className="btn-icon" />
            </div>

            <h4 className="long-date">{todayFormatted}</h4>
            <div className="text-container">
               <textarea
                  className="input-entry"
                  name="content"
                  onChange={updateEntry}
                  value={currentEntry.content}
                  rows="10"
                  placeholder="Today..."
                  action="text update"
               ></textarea>
            </div>
            <div id="mood-container" className="input-entry">
               <p>{moodInFocus}</p>
               <div className="mood-tracker scrollbar">
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
                        //States
                        key="currentMood"
                        mood={currentEntry.mood}
                        avatar={avatar}
                        action="reveal choices"
                        chosenMood={currentEntry.mood}
                        // Actions
                        changeMoodFocus={changeMoodFocus}
                        updateEntry={updateEntry}
                        revealChoices={revealChoices}
                     />
                     <div className="mood-text">
                        <h3>Mood Tracker</h3>
                        <div>
                           <p>Pick a mood</p>
                        </div>
                     </div>
                  </div>
               </div>
               <textarea
                  className="input-entry entry-reason"
                  onChange={updateEntry}
                  name="reason"
                  value={currentEntry.reason}
                  placeholder="Why do you feel this way?"
                  action="text update"
               ></textarea>
            </div>
         </form>
      </div>
   );
}

export default JournalEntry;
