import React, { useState } from "react";
import "./Avatar.css";

import { ReactComponent as MoodSelector } from "./images/expressions.svg";
import Animal from "./Animal";

function Avatar({ avatar, setAvatar }) {
   const allAnimals = [
      "default",
      "cat",
      "dog",
      "bunny",
      "bear",
      "panda",
      "deer",
   ];

   const [showAvatars, setShowAvatars] = useState(false);

   function showAllAvatars() {
      setShowAvatars(!showAvatars);
   }

   function changeAvatar(event) {
      setAvatar(event.currentTarget.getAttribute("name"));
      setShowAvatars(false);
   }

   return (
      <div id="avatar-container" className="neutral">
         <div className={avatar}>
            <MoodSelector
               onClick={showAllAvatars}
               className="svg-expression animals display-btn"
            />
         </div>

         <div id="avatar-options" className={showAvatars ? " open" : ""}>
            {allAnimals.map((animal, index) => {
               return (
                  <Animal
                     key={index}
                     animal={animal}
                     changeAvatar={changeAvatar}
                  />
               );
            })}
         </div>
      </div>
   );
}

export default Avatar;
