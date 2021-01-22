import React from "react";

import { ReactComponent as MoodSelector } from "./images/expressions.svg";

function Animal({ animal, changeAvatar }) {
   return (
      <div
         onClick={changeAvatar}
         className={`neutral ${animal} animals`}
         name={animal}
      >
         <MoodSelector className="svg-expression" value={animal} />
      </div>
   );
}

export default Animal;
