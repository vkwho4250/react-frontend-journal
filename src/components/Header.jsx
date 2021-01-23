import React from "react";
import "./Header.css";

function Header({ showReport, setShowReport }) {
   function changeReportDisplay() {
      setShowReport(!showReport);
   }

   return (
      <div id="header">
         <div className="header-actions">
            <button>
               <h5>Tracker</h5>
            </button>
            <button onClick={changeReportDisplay}>
               <h5>Date Summary</h5>
            </button>
            <button>
               <h5>How to Use</h5>
            </button>
         </div>

         <button
            onClick={changeReportDisplay}
            className={showReport ? "" : " no-display"}
         >
            <h5>Return to Dashboard</h5>
         </button>
      </div>
   );
}

export default Header;
