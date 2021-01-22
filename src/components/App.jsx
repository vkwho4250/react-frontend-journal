import React, { useState } from "react";
import Dashboard from "./Dashboard";

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

   const allAnimals = ["cat", "dog", "bunny", "bear", "panda", "deer"];
   const [avatar, setAvatar] = useState("");
   // const [chosenMood, setChosenMood] = useState("neutral");

   // function selectMood(event) {
   //    const { value } = event.target;
   //    setChosenMood(value);
   // }

   function selectAvatar(event) {
      const { value } = event.target;
      setAvatar(value);
   }

   const [entries, setEntries] = useState([
      {
         id: 0,
         title: "Entry 1",
         date: "2021-01-20",
         content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget scelerisque est. Ut vitae nibh magna. Vestibulum ex est, tincidunt id viverra ac, scelerisque id sem. Mauris sagittis neque felis, ac sodales nisl pellentesque vitae. In hac habitasse platea dictumst. Proin id cursus magna. Maecenas imperdiet ex sit amet rutrum suscipit. Sed ante magna, dictum eu imperdiet ut, molestie ultrices tortor. Maecenas lobortis nunc eu massa condimentum, vel bibendum magna commodo. Phasellus commodo egestas sapien, nec aliquet mi sollicitudin in. In condimentum eget ex a venenatis. Sed finibus, nunc sagittis hendrerit malesuada, lacus orci semper dolor, nec tristique tellus turpis ut dolor. Phasellus hendrerit ac turpis sed ornare. Praesent maximus feugiat orci nec tincidunt.",
         mood: "Sad",
         moodReason: "I dropped my taco.",
      },
      {
         id: 1,
         title: "Entry 2",
         date: "2021-01-15",
         content:
            "Suspendisse vitae elementum ante. Donec placerat quis est vel lacinia. Aenean nec tincidunt nisi, ut ullamcorper odio. Mauris auctor fringilla mauris sed posuere. Praesent ullamcorper pharetra nibh, ut interdum enim iaculis non. Maecenas fringilla eu nibh at placerat. Fusce et mi risus. Etiam hendrerit, mauris in semper mollis, neque ligula tempor nibh, vitae varius orci eros vitae metus. Aliquam nulla odio, ullamcorper sit amet lectus ac, hendrerit tempor purus. Sed blandit, mi id elementum tristique, purus diam sodales erat, et vehicula eros risus et felis. In hac habitasse platea dictumst. Nulla facilisis turpis a pretium convallis.",
         mood: "Happy",
         moodReason: "I made tacos.",
      },
   ]);

   const [habits, setHabits] = useState([
      {
         id: 0,
         habit: "Drink 8 cups of water a day",
         abbr: "W",
         dates: ["2021-01-19"],
         completed: [true],
      },
      {
         id: 1,
         habit: "Take vitamins",
         abbr: "V",
         dates: ["2021-01-18", "2021-01-19"],
         completed: [true, false],
      },
   ]);

   const [allItems, setAllItems] = useState([
      {
         id: 0,
         type: "todo",
         category: "Shopping",
         content: "This is a test for T1",
         date: "2021-01-23",
      },
      {
         id: 1,
         type: "general",
         category: "Banking",
         content: "This is a test for T2",
         date: "2021-01-24",
      },
      {
         id: 2,
         category: "Errands",
         type: "todo",
         content:
            "This is a long test for T2.This is a long test for T2.This is a long test for T2.This is a long test for T2. ",
         date: "2021-01-26",
      },
      {
         id: 3,
         type: "todo",
         category: "Family",
         content: "This is a long test for T4",
         date: "2021-01-26",
      },
      {
         id: 4,
         type: "event",
         category: "Birthdays",
         content: "This is Jam's Bday",
         date: "2021-01-15",
      },
      {
         id: 5,
         type: "event",
         category: "Family",
         content: "Picnic",
         date: "2021-01-26",
      },
   ]);

   // > ========  MANAGING COLLECTIONS -- ITEMS AND EVENTS =================

   const [itemsOverflow, setItemsOverflow] = useState(false);
   const [createDisplay, setCreateDisplay] = useState(false);
   const [itemType, setItemType] = useState("general");

   const [action, setAction] = useState("Add");
   const [newItem, setNewItem] = useState({
      id: allItems.length,
      type: "general",
      category: "",
      content: "",
      date: todayString,
   });

   function filterItems(array, byProperty, propertyName) {
      console.log("filterItems");

      return array.filter((item) => {
         return item[byProperty] === propertyName;
      });
   }

   function editItem(itemID) {
      setAction("Submit Edit");
      setCreateDisplay(true);
      setItemType(allItems[itemID].type);

      setNewItem({
         id: itemID,
         type: allItems[itemID].type,
         category: allItems[itemID].category,
         content: allItems[itemID].content,
         date: allItems[itemID].date,
      });
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

   function optionSelected(option) {
      setNewItem((prevContent) => {
         return {
            ...prevContent,
            ["category"]: option,
         };
      });
   }

   function changeCreateDisplay() {
      setCreateDisplay(!createDisplay);
      setNewItem({
         id: allItems.length,
         type: "general",
         category: "",
         content: "",
         date: todayString,
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
      <div>
         <Dashboard
            // Variables
            today={today}
            todayString={todayString}
            allMoods={allMoods}
            // chosenMood={chosenMood}
            // setChosenMood={setChosenMood}
            allAnimals={allAnimals}
            avatar={avatar}
            entries={entries}
            setEntries={setEntries}
            habits={habits}
            setHabits={setHabits}
            allItems={allItems}
            setAllItems={setAllItems}
            newItem={newItem}
            setNewItem={setNewItem}
            itemType={itemType}
            setItemType={setItemType}
            itemsOverflow={itemsOverflow}
            createDisplay={createDisplay}
            action={action}
            // Functions
            filterItems={filterItems}
            addItem={addItem}
            removeItem={removeItem}
            editItem={editItem}
            optionSelected={optionSelected}
            changeCreateDisplay={changeCreateDisplay}
         />
      </div>
   );
}

export default App;
