import React from "react";
import "./Dropdown.css";

function Dropdown({ option, optionSelected }) {
   function useOption() {
      optionSelected(option);
   }

   return (
      <div className="dropdown">
         <li onClick={useOption}>{option}</li>
      </div>
   );
}

export default Dropdown;
