import React from "react";
import "./Mood.css";

import { ReactComponent as MoodSelector } from "../images/expressions.svg";

function Mood({
   //Variable
   mood,
   avatar,
   action,
   chosenMood,
   //Functions
   changeMoodFocus,
   updateEntry,
   revealChoices,
}) {
   return (
      <div
         onClick={action === "select mood" ? updateEntry : revealChoices}
         onMouseEnter={changeMoodFocus}
         onMouseLeave={changeMoodFocus}
         className={
            `mood-box ${mood} ${avatar}` +
            (chosenMood === mood ? " in-front" : "")
         }
         name="mood"
         value={mood}
         action={action}
      >
         <MoodSelector
            className="svg-expression"
            value={mood}
            avatar={avatar}
         />
      </div>
   );
}

export default Mood;
