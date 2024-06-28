console.log("Script is working");

/*
Reminder App

Create a reminder app

There should be:

An input for entering the title
An input for entering priority
An input for color
A textarea for adding a description
A button for adding the reminder
A button for showing all reminders
When the button for adding is clicked an object needs to be created with the properties from the inputs ( title, priority, color, and description )
The object should then be added to an array of reminders
When the button for showing all reminders is clicked it should show a table with title, priority, and description columns
The title should be the color of the "color" property
Don't forget to reset the inputs after adding a reminder
*/

// Calling all selectors from HTML

const titleInput = document.querySelector("#title");
const priorityInput = document.querySelector("#priority");
const colorInput = document.querySelector("#color");
const descriptionInput = document.querySelector("#description");
const addButton = document.querySelector("#add");
const showButton = document.querySelector("#showReminder");
const textContainer = document.querySelector(".text-container");
const deleteAllButton = document.querySelector("#clearButton");

// console.log(
//   titleInput,
//   priorityInput,
//   colorInput,
//   descriptionInput,
//   addButton,
//   showButton
// );
// console.log(textContainer);

// Creating class for Riminder with parametars us inputs

class Reminder {
  constructor(title, priority, color, description) {
    this.title = title;
    this.priority = priority;
    this.color = color;
    this.description = description;
  }
}

// Create function that will generate new obejct(reminder) every time is called

function generateReminderObj(title, priority, color, description) {
  return new Reminder(title, priority, color, description);
}

// Create empty array for pushing objects in

let reminders = [];

// Creating a function with event listener that on click will generate new reminder(obejct) and that new reminder
// (object) will be pushed in empty array and will console log array

addButton.addEventListener("click", function () {
  const title = document.querySelector("#title").value;
  const priority = document.querySelector("#priority").value;
  const color = document.querySelector("#color").value;
  const description = document.querySelector("#description").value;

  let newReminder = generateReminderObj(title, priority, color, description);

  console.log(newReminder);

  reminders.push(newReminder);

  console.log(reminders);
});

// Creating a function that will delete all value in inputs when function is called

function clearInputs() {
  document.querySelector("#title").value = "";
  document.querySelector("#priority").value = "";
  document.querySelector("#color").value = "";
  document.querySelector("#description").value = "";
}

// Creating a function with add event listener that on click will be create a table with 3 th in table head and
// will display a value from inputs in next rows us a reminders. th data will have color from input

showButton.addEventListener("click", function () {
  const table = document.querySelector("#table");

  table.innerHTML = "";
  table.innerHTML += ` 
  <thead>
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Description</th>
          </tr>
  </thead>`;
  for (let i = 0; i < reminders.length; i++) {
    table.innerHTML += `
    <tbody>
    <tr>
    <td style="color:${reminders[i].color}">${reminders[i].title}</td>
    <td>${reminders[i].priority}</td>
    <td>${reminders[i].description}</td>
    </tr>
    </tbody>
    `;
  }

  clearInputs();
});

// Add event listener button with function that delete all table with added reminders and table head

deleteAllButton.addEventListener("click", function () {
  const table = document.querySelector("#table");
  table.innerHTML = "";
});
