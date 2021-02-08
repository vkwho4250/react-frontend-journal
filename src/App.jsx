import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Avatar from "./components/avatar/Avatar";
import Header from "./components/Header";
import Report from "./components/log/Report";
import testData from "./testData";

function App() {
   const today = new Date(new Date().setHours(0, 0, 0, 0));
   const todayString = today.toISOString().substring(0, 10);
   const allMoods = [
      "neutral",
      "happy",
      "excited",
      "mischievous",
      "meh",
      "unimpressed",
      "angry",
      "embarassed",
      "sad",
      "distraught",
   ];

   const [frontPanel, setFrontPanel] = useState("summary");
   const [showReport, setShowReport] = useState(false);
   const [avatar, setAvatar] = useState("default");
   const [entries, setEntries] = useState(testData.testEntries);

   const [habits, setHabits] = useState(testData.testHabits);

   const [allItems, setAllItems] = useState(testData.testItems);

   useEffect(() => {
      setEntries((prevValue) => {
         return [
            ...prevValue,
            {
               id: prevValue.length,
               title: "",
               date: todayString,
               content: "",
               mood: "neutral",
               reason: "",
            },
         ];
      });
   }, [todayString]);

   // > ========  Collections ================

   const [itemsOverflow, setItemsOverflow] = useState(false);
   const [createDisplay, setCreateDisplay] = useState(false);
   const [groupingDisplay, setGroupingDisplay] = useState(false);
   const [itemType, setItemType] = useState("general");

   const [action, setAction] = useState("Add");
   const [newItem, setNewItem] = useState({
      id: allItems.length,
      type: "general",
      category: "",
      content: "",
      date: todayString,
      completed: false,
   });

   const [listGroups, setListGroups] = useState({
      propertyName: "category",
      propertyValues: [],
   });

   function filterItems(array, propertyName, propertyValue) {
      return array.filter((item) => {
         return item[propertyName] === propertyValue;
      });
   }

   function editItem(itemID, changeStatus) {
      setAction("Submit Edit");

      if (changeStatus === "status") {
         setAllItems((prevItems) => {
            let temp = [...prevItems];
            temp[itemID] = {
               id: itemID,
               type: allItems[itemID].type,
               category: allItems[itemID].category,
               content: allItems[itemID].content,
               date: allItems[itemID].date,
               completed: !allItems[itemID].completed,
            };
            return [...temp];
         });
      } else {
         setCreateDisplay(true);
         setNewItem({
            id: itemID,
            type: allItems[itemID].type,
            category: allItems[itemID].category,
            content: allItems[itemID].content,
            date: allItems[itemID].date,
            completed: allItems[itemID].completed,
         });
         setItemType(allItems[itemID].type);
      }
   }

   function addItem(event) {
      if (newItem.content.trim() === "") {
         document.querySelector(".input-content").classList.add("empty-input");
      } else if (newItem.category.trim() === "") {
         document
            .querySelector(".input-content")
            .classList.remove("empty-input");
         document.querySelector(".input-category").classList.add("empty-input");
      } else {
         document
            .querySelector(".input-content")
            .classList.remove("empty-input");
         document
            .querySelector(".input-category")
            .classList.remove("empty-input");

         setAllItems((prevItems) => {
            if (action === "Add") {
               return [...prevItems, newItem];
            } else {
               let temp = [...prevItems];
               temp[newItem.id] = newItem;
               return [...temp];
            }
         });

         setCreateDisplay(false);
         setAction("Add");
         setNewItem((prevValue) => ({
            id: prevValue.id + 1,
            todo: "general",
            category: "",
            content: "",
            date: todayString,
            completed: false,
         }));
      }

      areItemsOverflowing();
      event.preventDefault();
   }

   function removeItem(itemID) {
      setAllItems((prevItems) => {
         return prevItems.filter((item) => {
            return item.id !== itemID;
         });
      });

      areItemsOverflowing();
   }

   function optionSelected(grouping, option) {
      if (grouping === "category-suggestions") {
         setNewItem((prevContent) => {
            return {
               ...prevContent,
               ["category"]: option,
            };
         });
      } else {
         listGrouping(grouping);
         setGroupingDisplay(false);
      }
   }

   function listGrouping(property) {
      let temp = allItems.map((item) => item[property]);
      temp.sort();

      setListGroups({
         propertyName: property,
         propertyValues: [...new Set(temp)],
      });
   }

   function changeGroupingDisplay(event) {
      if (event.currentTarget.getAttribute("name") === "Edit groupings") {
         setGroupingDisplay(!groupingDisplay);
      } else {
         setGroupingDisplay(false);
      }
   }

   function changeCreateDisplay() {
      setCreateDisplay(!createDisplay);
      setNewItem({
         id: allItems.length,
         type: "general",
         category: "",
         content: "",
         date: todayString,
         completed: false,
      });
      setItemType("general");
   }

   function areItemsOverflowing() {
      if (
         document.querySelector(".list-container").scrollHeight >
         document.querySelector(".list-container").offsetHeight
      ) {
         setItemsOverflow(true);
      } else {
         setItemsOverflow(false);
      }
   }

   return (
      <div id="app-container">
         <Header
            showReport={showReport}
            setShowReport={setShowReport}
            setFrontPanel={setFrontPanel}
         />
         <Avatar avatar={avatar} setAvatar={setAvatar} />
         <Report
            //States
            today={today}
            todayString={todayString}
            avatar={avatar}
            allItems={allItems}
            entries={entries}
            habits={habits}
            //Actions
            filterItems={filterItems}
            showReport={showReport}
         />
         <Dashboard
            // States & Actions
            today={today}
            todayString={todayString}
            frontPanel={frontPanel}
            allMoods={allMoods}
            avatar={avatar}
            entries={entries}
            setEntries={setEntries}
            habits={habits}
            setHabits={setHabits}
            allItems={allItems}
            setAllItems={setAllItems}
            listGroups={listGroups}
            newItem={newItem}
            setNewItem={setNewItem}
            itemType={itemType}
            setItemType={setItemType}
            itemsOverflow={itemsOverflow}
            createDisplay={createDisplay}
            groupingDisplay={groupingDisplay}
            action={action}
            // Actions
            filterItems={filterItems}
            listGrouping={listGrouping}
            addItem={addItem}
            removeItem={removeItem}
            editItem={editItem}
            optionSelected={optionSelected}
            changeCreateDisplay={changeCreateDisplay}
            changeGroupingDisplay={changeGroupingDisplay}
         />
      </div>
   );
}

export default App;
