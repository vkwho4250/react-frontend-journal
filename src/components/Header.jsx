import React, { useState } from "react";
import "./Header.css";

import Dropdown from "./general/Dropdown";

import MenuIcon from "@material-ui/icons/Menu";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

function Header({ showReport, setShowReport, setFrontPanel }) {
   const [panelMenu, setPanelMenu] = useState(false);

   function changeReportDisplay() {
      setShowReport(!showReport);
   }

   function changePanelMenu(event) {
      if (event.currentTarget.getAttribute("name") === "close-btn") {
         setPanelMenu(false);
      } else {
         setPanelMenu(!panelMenu);
      }
   }

   function changeFrontPanel(grouping, option) {
      setFrontPanel(option);
      setPanelMenu(false);
   }

   return (
      <div>
         <div
            id="panel-menu"
            className={`suggestions grouping-options ${
               panelMenu ? "open" : ""
            }`}
         >
            <ExpandLessIcon
               onClick={changePanelMenu}
               className="btn-icon create-close-btn"
               name="close-btn"
            />
            <ul>
               {["summary", "collections", "journal"].map((panel, index) => {
                  return (
                     <Dropdown
                        key={index}
                        option={panel}
                        optionSelected={changeFrontPanel}
                        grouping="panel"
                     />
                  );
               })}
            </ul>
         </div>
         <div id="header">
            <div className="header-actions">
               <button onClick={changeReportDisplay}>
                  <h5>Logs</h5>
               </button>
               <button>
                  <h5>How to Use</h5>
               </button>
            </div>
            <button onClick={changePanelMenu}>
               <MenuIcon className="btn-icon menu-icon" />
            </button>
            <button
               onClick={changeReportDisplay}
               className={"dashboard-btn" + (showReport ? "" : " no-display")}
            >
               <h5>Return to Dashboard</h5>
            </button>
         </div>
      </div>
   );
}

export default Header;
