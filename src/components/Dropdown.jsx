import React from "react";
import "./Dropdown.css";

function Dropdown({ option, optionSelected, grouping }) {
   function useOption() {
      optionSelected(grouping, option);
   }

   return (
      <div className="dropdown">
         <li onClick={useOption}>{option}</li>
      </div>
   );
}

export default Dropdown;
