import React, { useState } from "react";
import Dashboard from "./Dashboard";

function App() {
   const today = new Date();

   const [allItems, setAllItems] = useState([
      {
         id: 0,
         category: "shop1",
         content: "This is a test for T1",
         deadline: "2021-01-23",
      },
      {
         id: 1,
         category: "shop2",
         content: "This is a test for T2",
         deadline: "2021-01-23",
      },
      {
         id: 2,
         category: "shop2",
         content:
            "This is a long test for T2.This is a long test for T2.This is a long test for T2.This is a long test for T2. ",
         deadline: "2021-01-26",
      },
      {
         id: 3,
         category: "sdf",
         content: "This is a long test for T4",
         deadline: "2021-01-26",
      },
   ]);

   return (
      <div>
         <Dashboard
            today={today}
            allItems={allItems}
            setAllItems={setAllItems}
         />
      </div>
   );
}

export default App;
