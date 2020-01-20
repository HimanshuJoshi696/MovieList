console.log("file attached");

//constructor function for add tde book details object

function booksData(movieName, year, type) {
  this.movieName = movieName;
  this.year = year;
  this.type = type;
}

//display Your Data

function displayDataUI() {}

// help of prototype

displayDataUI.prototype.add = function(movieData) {
  console.log("adding movie data", movieData);
  let tableBody = document.getElementById("tableBody");
  let uiQuotes = `
    <tr>
              <td scope="col">${movieData.movieName}</td>
              <td scope="col">${movieData.year}</td>
              <td scope="col">${movieData.type}</td>
            </tr>
    `;
  tableBody.innerHTML += uiQuotes;
};

displayDataUI.prototype.clear = function() {
  let movieForm = document.getElementById("movieForm");
  movieForm.reset();
};

displayDataUI.prototype.showMessage = function(type, displayMessage) {
  let message = document.getElementById("message");
  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>Messge:</strong> ${displayMessage}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">×</span>
    </button>
</div>`;
  setTimeout(function() {
    message.innerHTML = "";
  }, 2000);
};

// add listener

let movieForm = document.getElementById("movieForm");
movieForm.addEventListener("submit", addBooksDetails);

function addBooksDetails(e) {
  let movieName = document.getElementById("moviename").value;
  let year = document.getElementById("year").value;
  let type = document.querySelector(".form-check-input:checked").value;
  let movieObj = new booksData(movieName, year, type);

  let display = new displayDataUI();
  if (movieName.length === 0 || year.length === 0) {
    display.showMessage("danger", " Sorry you cannot add this movie");
  } else {
    display.add(movieObj);
    display.clear();
    display.showMessage("success", "Your movie has been successfully added");
  }

  e.preventDefault();
}
