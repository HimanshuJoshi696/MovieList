function CreationMovieList(name, year, type) {
  this.name = name;
  this.year = year;
  this.type = type;
}
showMoviesList();
//function prototype create function
function allActionProtos(movieListData) {}

allActionProtos.prototype.add = function(movieListData) {
  let getMovieObjFromStorage = JSON.parse(localStorage.getItem("movieList"));
  if (getMovieObjFromStorage == null) {
    newMovieArr = [];
  } else {
    newMovieArr = getMovieObjFromStorage;
  }
  newMovieArr.push(movieListData);
  localStorage.setItem("movieList", JSON.stringify(newMovieArr));
  showMoviesList();
};

function showMoviesList() {
  let getMovieObjFromStorage = JSON.parse(localStorage.getItem("movieList"));
  let tableBody = document.getElementById("tableBody");
  if (getMovieObjFromStorage == null) {
    newMovieArr = [];
  } else {
    newMovieArr = getMovieObjFromStorage;
  }
  let createRows = "";
  newMovieArr.map((data, index) => {
    createRows += ` <tr>
    <td scope="col">${data.name}</td>
    <td scope="col">${data.year}</td>
    <td scope="col">${data.type}</td>
    <td scope="col"><button id="${index}"onclick="deleteMovie(this.id)" class="btn btn-primary">Delete Note</button></td>

  </tr>
  `;
  });
  if (newMovieArr.length != 0) {
    tableBody.innerHTML = createRows;
  } else {
    tableBody.innerHTML = "There is no movies yet !!";
  }
}
//delete movie list
function deleteMovie(id) {
  let getMovieObjFromStorage = JSON.parse(localStorage.getItem("movieList"));
  if (getMovieObjFromStorage == null) {
    newMovieArr = [];
  } else {
    newMovieArr = getMovieObjFromStorage;
  }
  console.log(newMovieArr)
  newMovieArr.splice(id, 1);
  localStorage.setItem("movieList", JSON.stringify(newMovieArr));
  showMoviesList();
}
//reset form after added movie into localstorage
allActionProtos.prototype.reset = function() {
  document.querySelector("#movieForm").reset();
};

//show success and error message when click on the submit form
allActionProtos.prototype.displayShowMessage = function(type, showMessage) {
  let message = document.querySelector("#message");
  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>Messge:</strong> ${showMessage}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">×</span>
    </button>
</div>`;
  setTimeout(function() {
    message.innerHTML = "";
  }, 2000);
};

//Creating addEvent listener Form button action
document.getElementById("movieForm").addEventListener("submit", submitForm);

//Form button action function
function submitForm(e) {
  let movieName = document.querySelector("#moviename").value;
  let movieYear = document.querySelector("#year").value;
  let movieType = document.querySelector(".form-check-input:checked").value;
  let createMovieListObj = new CreationMovieList(
    movieName,
    movieYear,
    movieType
  );

  let movieActionsProto = new allActionProtos();
  if (movieName != "" && movieYear != "" && movieType != "") {
    movieActionsProto.add(createMovieListObj);
    movieActionsProto.reset();
    movieActionsProto.displayShowMessage(
      "success",
      "Your movie has been successfully added"
    );
  } else {
    movieActionsProto.displayShowMessage(
      "danger",
      "Sorry you cannot add this movie"
    );
  }
  e.preventDefault();
}
