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
  const inactiveLikes = document.querySelectorAll(".element__like");
  const activeLikes = document.querySelectorAll(".element__likee");

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
      <img src="images/Trash.png" class="element__delete" alt="Excluir" />
      <img class="element__rectangle" src="./images/Rectangle.png" />
      <img class="element__local" src="${locationImage}" alt="${locationName}" loading="lazy" style="
      width: 100%;
      height: 282px;
      object-fit: cover;
    "/>
      <div class="element__conteiner">
        <h3 class="element__title">${locationName}</h3>
        <img class="element__like" src="./images/Group.png" alt="like" />
        <img class="element__likee" src="./images/Union.png" alt="liked" />
      </div>
    `;

    elementsContainer.prepend(newCard);
    addForm.reset();
    addModal.style.display = "none";

    const inactiveLike = newCard.querySelector(".element__like");
    const activeLike = newCard.querySelector(".element__likee");
    const deleteButton = newCard.querySelector(".element__delete");

    activeLike.style.display = "none";

    inactiveLike.addEventListener("click", () => {
      inactiveLike.style.display = "none";
      activeLike.style.display = "inline";
    });

    activeLike.addEventListener("click", () => {
      activeLike.style.display = "none";
      inactiveLike.style.display = "inline";
    });

    deleteButton.addEventListener("click", () => {
      newCard.remove();
    });
  });

  const deleteButtons = document.querySelectorAll(".element__delete");

  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      const card = deleteButton.closest(".element");
      card.remove();
    });
  });
});

const enlargeModal = document.getElementById("enlargeModal");
const modalImage = document.getElementById("Myplace");
const modalTitle = document.getElementById("captar");
const closeModalButton = document.querySelector(".fechar");

document.addEventListener("click", (e) => {
  const elem = e.target;

  if (elem.classList.contains("element__local")) {
    enlargeModal.classList.add("show-modal");
    enlargeModal.style.display = "flex";
    modalImage.src = elem.src;
    modalImage.alt = elem.alt;
    const titleElement = elem
      .closest(".element")
      .querySelector(".element__title");
    modalTitle.textContent = titleElement
      ? titleElement.textContent
      : "Sem título";
  }
});

closeModalButton.addEventListener("click", () => {
  enlargeModal.style.display = "none";
  enlargeModal.classList.remove("show-modal");
  modalImage.src = "";
  modalTitle.textContent = "";
});

window.addEventListener("click", (e) => {
  if (e.target === enlargeModal) {
    enlargeModal.style.display = "none";
    enlargeModal.classList.remove("show-modal");
    modalImage.src = "";
    modalTitle.textContent = "";
  }
});

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function createCard(cardData) {
  const card = document.createElement("div");
  card.classList.add("element");
  card.innerHTML = `
    <img src="images/Trash.png" class="element__delete" alt="Excluir" />
    <img class="element__rectangle" src="./images/Rectangle.png" alt="retângulo branco" />
    <img class="element__local" src="${cardData.link}" alt="${cardData.name}" />
    <div class="element__conteiner">
      <h3 class="element__title">${cardData.name}</h3>
      <img class="element__like" src="./images/Group.png" alt="like" />
      <img class="element__likee" src="./images/Union.png" alt="liked" />
    </div>
  `;

  const inactiveLike = card.querySelector(".element__like");
  const activeLike = card.querySelector(".element__likee");
  activeLike.style.display = "none";

  inactiveLike.addEventListener("click", () => {
    inactiveLike.style.display = "none";
    activeLike.style.display = "inline";
  });

  activeLike.addEventListener("click", () => {
    activeLike.style.display = "none";
    inactiveLike.style.display = "inline";
  });

  const deleteButton = card.querySelector(".element__delete");
  deleteButton.addEventListener("click", () => {
    card.remove();
  });

  return card;
}
document.addEventListener("DOMContentLoaded", () => {
  const elementsContainer = document.querySelector(".elements");

  initialCards.forEach((cardData) => {
    const card = createCard(cardData);
    elementsContainer.appendChild(card);
  });
});
