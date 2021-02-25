const currentDate = new Date();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const year = String(currentDate.getFullYear());

const testEntries = [
   {
      id: 0,
      title: "Entry 1",
      date: "2021-01-20",
      content:
         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget scelerisque est. Ut vitae nibh magna. Vestibulum ex est, tincidunt id viverra ac, scelerisque id sem. Mauris sagittis neque felis, ac sodales nisl pellentesque vitae. In hac habitasse platea dictumst. Proin id cursus magna. Maecenas imperdiet ex sit amet rutrum suscipit. Sed ante magna, dictum eu imperdiet ut, molestie ultrices tortor. Maecenas lobortis nunc eu massa condimentum, vel bibendum magna commodo. Phasellus commodo egestas sapien, nec aliquet mi sollicitudin in. In condimentum eget ex a venenatis. Sed finibus, nunc sagittis hendrerit malesuada, lacus orci semper dolor, nec tristique tellus turpis ut dolor. Phasellus hendrerit ac turpis sed ornare. Praesent maximus feugiat orci nec tincidunt.",
      mood: "sad",
      reason: "I dropped my taco.",
   },
   {
      id: 1,
      title: "Entry 2",
      date: "2021-01-15",
      content:
         "Suspendisse vitae elementum ante. Donec placerat quis est vel lacinia. Aenean nec tincidunt nisi, ut ullamcorper odio. Mauris auctor fringilla mauris sed posuere. Praesent ullamcorper pharetra nibh, ut interdum enim iaculis non. Maecenas fringilla eu nibh at placerat. Fusce et mi risus. Etiam hendrerit, mauris in semper mollis, neque ligula tempor nibh, vitae varius orci eros vitae metus. Aliquam nulla odio, ullamcorper sit amet lectus ac, hendrerit tempor purus. Sed blandit, mi id elementum tristique, purus diam sodales erat, et vehicula eros risus et felis. In hac habitasse platea dictumst. Nulla facilisis turpis a pretium convallis.",
      mood: "happy",
      reason: "I made tacos.",
   },
];

const testHabits = [
   {
      id: 0,
      habit: "Drink 8 cups of water a day",
      abbr: "W",
      dates: [
         `2021-01-01`,
         "2021-01-02",
         "2021-01-03",
         "2021-01-04",
         "2021-01-05",
         "2021-01-06",
         "2021-01-07",
         "2021-01-08",
         "2021-01-09",
         "2021-01-10",
      ],
      completed: [
         true,
         false,
         true,
         true,
         true,
         false,
         true,
         false,
         true,
         true,
      ],
   },
   {
      id: 1,
      habit: "Take vitamins",
      abbr: "V",
      dates: ["2021-01-16", "2021-01-17", "2021-01-18", "2021-01-19"],
      completed: [true, true, false, true],
   },
];

const testItems = [
   {
      id: 0,
      type: "todo",
      category: "Shopping",
      content: "Buy oranges, apples and bananas",
      date: `${year}-${month}-15`,
      completed: false,
   },
   {
      id: 1,
      type: "general",
      category: "TO USER",
      content:
         "These are a couple of default notes for you to try functionality. Feel free to CRUD around - from Victoria ",
      date: `${year}-${month}-11`,
      completed: false,
   },
   {
      id: 2,
      category: "Errands",
      type: "todo",
      content: "Switch to winter tires",
      date: `${year}-${month}-11`,
      completed: false,
   },
   {
      id: 3,
      type: "todo",
      category: "Family",
      content: "Ensure no one flips",
      date: `${year}-${month}-10`,
      completed: false,
   },
   {
      id: 4,
      type: "event",
      category: "Birthdays",
      content: "Attend someone's Bday",
      date: `${year}-${month}-21`,
      completed: false,
   },
   {
      id: 5,
      type: "event",
      category: "Family",
      content: "Picnic",
      date: `${year}-${month}-15`,
      completed: false,
   },
];

const testData = {
   testEntries,
   testHabits,
   testItems,
};

export default testData;
