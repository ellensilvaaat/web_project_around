import { enableValidation } from "./validate.js";

const config = {
  formSelector: "form",
  inputSelector: ".modal-content__name, .modal-content__text",
  submitButtonSelector: ".modal-content__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

document.addEventListener("DOMContentLoaded", () => {
  enableValidation(config);

  const profileName = document.querySelector(".profile__name");
  const profileText = document.querySelector(".profile__text");
  const nameInput = document.querySelector(".modal-content__name");
  const jobInput = document.querySelector(".modal-content__text");
  const profileImage = document.getElementById("Img");
  const profileModal = document.getElementById("Modal");
  const profileClose = profileModal.querySelector(".close");
  const saveButton = profileModal.querySelector(".modal-content__button");

  const addButton = document.querySelector(".profile__addimg");
  const addModal = document.getElementById("addModal");
  const addClose = addModal.querySelector(".close");
  const addForm = document.getElementById("addForm");
  const titleInput = document.getElementById("locationName");
  const urlInput = document.getElementById("locationImage");
  const elementsContainer = document.querySelector(".elements");

  const enlargeModal = document.getElementById("enlargeModal");
  const modalImage = document.getElementById("Myplace");
  const modalTitle = document.getElementById("captar");
  const closeModalButton = document.querySelector(".fechar");

  function openModal(modal) {
    modal.style.display = "block";
  }

  function closeModal(modal) {
    modal.style.display = "none";
  }

  // Atualizar informações do primeiro popup
  saveButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (nameInput.validity.valid && jobInput.validity.valid) {
      profileName.textContent = nameInput.value;
      profileText.textContent = jobInput.value;
      closeModal(profileModal);
    }
  });

  // Listeners para abrir/fechar modais
  profileImage.addEventListener("click", () => {
    openModal(profileModal);
    nameInput.value = ""; // Deixa o campo vazio ao abrir
    jobInput.value = ""; // Deixa o campo vazio ao abrir
  });

  profileClose.addEventListener("click", () => {
    closeModal(profileModal);
  });

  addButton.addEventListener("click", () => {
    openModal(addModal);
    addForm.reset();
  });

  addClose.addEventListener("click", () => {
    closeModal(addModal);
  });

  addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (titleInput.validity.valid && urlInput.validity.valid) {
      const card = createCard({
        name: titleInput.value,
        link: urlInput.value,
      });
      elementsContainer.prepend(card);
      closeModal(addModal);
    }
  });

  function createCard(cardData) {
    const card = document.createElement("div");
    card.classList.add("element");
    card.innerHTML = `
      <img src="images/Trash.png" class="element__delete" alt="Excluir" />
      <img class="element__rectangle" src="./images/Rectangle.png" />
      <img class="element__local" src="${cardData.link}" alt="${cardData.name}" />
      <div class="element__conteiner">
        <h3 class="element__title">${cardData.name}</h3>
        <img class="element__like" src="./images/Group.png" alt="like" />
        <img class="element__likee" src="./images/Union.png" alt="liked" />
      </div>
    `;
    addCardListeners(card);
    return card;
  }

  function addCardListeners(card) {
    const inactiveLike = card.querySelector(".element__like");
    const activeLike = card.querySelector(".element__likee");
    const deleteButton = card.querySelector(".element__delete");

    inactiveLike.addEventListener("click", () => {
      inactiveLike.style.display = "none";
      activeLike.style.display = "inline";
    });

    activeLike.addEventListener("click", () => {
      activeLike.style.display = "none";
      inactiveLike.style.display = "inline";
    });

    deleteButton.addEventListener("click", () => {
      card.remove();
    });
  }

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("element__local")) {
      enlargeModal.style.display = "flex";
      modalImage.src = event.target.src;
      modalTitle.textContent = event.target
        .closest(".element")
        .querySelector(".element__title").textContent;
    }
  });

  closeModalButton.addEventListener("click", () => {
    closeModal(enlargeModal);
  });

  window.addEventListener("click", (event) => {
    if (event.target === profileModal) closeModal(profileModal);
    if (event.target === addModal) closeModal(addModal);
    if (event.target === enlargeModal) closeModal(enlargeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal(profileModal);
      closeModal(addModal);
      closeModal(enlargeModal);
    }
  });

  // Adicionar cartões iniciais
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
      name: "Parque Nacional da Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    },
  ];

  initialCards.forEach((cardData) => {
    const card = createCard(cardData);
    elementsContainer.appendChild(card);
  });
});
