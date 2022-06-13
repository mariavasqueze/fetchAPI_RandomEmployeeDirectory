
// Get gallery div
let galleryDiv = document.getElementById("gallery");
// Get body container
let body = document.getElementById("body");
// Create modal div
let modal = document.createElement("div");
modal.className = "modal";


// Fetch API
fetch("https://randomuser.me/api/?results=12")
  .then(res => res.json())
  .then(data => {
    let employees = data.results;
    console.log(employees);

    createEmployeeCards(employees);
  })
  .catch(error => console.log(error));


// Create 12 random employee cards for main screen
function createEmployeeCards(employees) {
  employees.forEach(employee => {
    galleryDiv.innerHTML +=
      `<div class="card">
            <div class="card-img-container">
              <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
              <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
              <p class="card-text">${employee.email}</p>
              <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
          </div>`;
  });
  modalModule(employees);
}


function modalModule(employee) {
  galleryDiv.addEventListener("click", event => {
    //Select all the employee cards (divs)
    let allCards = document.querySelectorAll(".card");

    //Find card that is clicked 
    let cardClicked = event.target.closest(".card");

    // If a card is clicked, go through all cards, match the name and create modal card of that employee (if name matches)
    if (cardClicked) {
      for (let i = 0; i < allCards.length; i++) {
        //Get name of employee that is clicked
        let cardClickedId = cardClicked.firstElementChild.nextElementSibling.firstElementChild
        // Get name of all employees
        let cardName = allCards[i].firstElementChild.nextElementSibling.firstElementChild;

        //If name clicked equals one of the employee names, create modal card
        if (cardClickedId.textContent === cardName.textContent) {
          CreateModalCard(employee[i]);
        }
      }
    }
  });

}

// Create individual employee modal card
function CreateModalCard(employee) {

  // Fix birthday format
  let birthday = employee.dob.date;
  let slicedBirthDate = birthday.substr(0, 10);
  console.log(slicedBirthDate);

  // Modal content
  modal.innerHTML = `
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}</p>
                <hr>
                <p class="modal-text">${employee.cell}</p>
                <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state}, ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${slicedBirthDate}10/21/2015</p>
            </div>
    `;

  // Should I NOT append to body???
  body.appendChild(modal);

  // Remove modal when click X (close)
  modal.addEventListener("click", event => {
    if (event.target.className == "modal-close-btn" || event.className == "modal-btn-container") {
      console.log(event);
      modal.remove();
    }
  })

}

/* 
* Search Functionality:
*/

// Append search bar:
let search_div = document.querySelector(".search-container");

let form = document.createElement("form");
form.method = "GET";
form.action = "#";
form.innerHTML =
  `<input type="search" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">`;
search_div.appendChild(form);


// Get the name div to use as search value, hide all card block elements, display if the name is same as typed. 
let searchBar = document.getElementById("search-input");
let searchButton = document.getElementById("search-submit");

function searchEmployee() {
  let names = document.querySelectorAll("#name");

  for (let i = 0; i < names.length; i++) {
    let card = names[i].parentElement.parentElement;

    // Default state = hidden
    card.style.display = "none";

    if (names[i].textContent.toLowerCase().includes(searchBar.value.toLowerCase())) {
      card.style.display = "block";
    }

    // if search bar is empty show all cards
    if (searchBar.value == "") {
      card.style.display = "block";
    }
  }
}

searchButton.addEventListener("click", event => {
  searchEmployee();
  event.preventDefault(); // needs prevent default function
});



