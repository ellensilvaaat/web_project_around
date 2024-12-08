var form = document.querySelector("#Modal form");
var profileImage = document.getElementById("Img");
var profileModal = document.getElementById("Modal");
var profileClose = profileModal.querySelector(".close");


profileImage.addEventListener("click", function () {
  profileModal.style.display = "block";
  profileModal.classList.add("show-modal");
});


profileClose.addEventListener("click", function () {
  profileModal.style.display = "none";
  profileModal.classList.remove("show-modal");
});


window.addEventListener("click", function (event) {
  if (event.target === profileModal) {
    profileModal.style.display = "none";
    profileModal.classList.remove("show-modal");
  }
});


form.addEventListener("submit", function (event) {
  event.preventDefault();

  var nameInput = document.querySelector(".modal-content__name");
  var jobInput = document.querySelector(".modal-content__text");
  var newName = nameInput.value;
  var newJob = jobInput.value;

  var name = document.querySelector(".profile__name");
  var job = document.querySelector(".profile__text");

  name.textContent = newName;
  job.textContent = newJob;

  profileModal.style.display = "none";
  profileModal.classList.remove("show-modal");
});


document.addEventListener("DOMContentLoaded", () => {
  const inactiveLikes = document.querySelectorAll(".element__like--inactive");
  const activeLikes = document.querySelectorAll(".element__like--active");

  inactiveLikes.forEach((inactiveLike, index) => {
    const activeLike = activeLikes[index]; 

    activeLike.style.display = "none";

    inactiveLike.addEventListener("click", () => {
      inactiveLike.style.display = "none"; 
      activeLike.style.display = "inline"; 
    });

    activeLike.addEventListener("click", () => {
      activeLike.style.display = "none";
      inactiveLike.style.display = "inline";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector(".profile__addimg");
  const addModal = document.getElementById("addModal");
  const addClose = document.getElementById("addClose");
  const addForm = document.getElementById("addForm");
  const elementsContainer = document.querySelector(".elements");


  addButton.addEventListener("click", () => {
    addModal.style.display = "block";
  });


  addClose.addEventListener("click", () => {
    addModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === addModal) {
      addModal.style.display = "none";
    }
  });

  addForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const locationName = document.getElementById("locationName").value;
    const locationImage = document.getElementById("locationImage").value;

    const newCard = document.createElement("div");
    newCard.classList.add("element");
    newCard.innerHTML = `
      <img class="element__rectangle" src="./images/Rectangle.png" />
      <img class="element__local" src="${locationImage}" alt="${locationName}" loading="lazy" style="
      width: 100%;
      height: 282px;
      object-fit: cover;
    "/>
      <div class="element__conteiner">
        <h3 class="element__title">${locationName}</h3>
        <img class="element__like element__like--inactive" src="./images/Group.png" alt="like" />
        <img class="element__like element__like--active" src="./images/Union.png" alt="liked" />
      </div>
    `;

    elementsContainer.prepend(newCard);

    addForm.reset();

    addModal.style.display = "none";

    const inactiveLike = newCard.querySelector(".element__like--inactive");
    const activeLike = newCard.querySelector(".element__like--active");

    activeLike.style.display = "none";

    inactiveLike.addEventListener("click", () => {
      inactiveLike.style.display = "none";
      activeLike.style.display = "inline";
    });

    activeLike.addEventListener("click", () => {
      activeLike.style.display = "none";
      inactiveLike.style.display = "inline";
    });
  });
});
