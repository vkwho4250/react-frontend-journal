import React, { useState } from "react";
import "./Mood.css";

import { ReactComponent as MoodSelector } from "./images/expressions.svg";

function Mood({
   mood,
   avatar,
   changeMoodFocus,
   chosenMood,
   updateEntry,
   action,
   revealChoices,
}) {
   return (
      <div
         onClick={action === "select mood" ? updateEntry : revealChoices}
         onMouseEnter={changeMoodFocus}
         onMouseLeave={changeMoodFocus}
         className={
            `mood-box ${mood} ${avatar}` +
            (chosenMood === mood ? "in-front" : "")
         }
         name="mood"
         value={mood}
         action={action}
      >
         <MoodSelector className="svg-expression" value={mood} />
      </div>
   );
}

export default Mood;
