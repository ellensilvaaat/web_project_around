import { openModal, closeModal, setCloseOnOverlay } from "./utils.js";
import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";

const config = {
  formSelector: "form",
  inputSelector: ".modal-content__name, .modal-content__text",
  submitButtonSelector: ".modal-content__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

document.addEventListener("DOMContentLoaded", () => {
  const profileModal = document.querySelector("#Modal");
  const addModal = document.querySelector("#addModal");
  const enlargeModal = document.querySelector("#enlargeModal");

  const profileEditButton = document.querySelector("#Img");
  const profileCloseButton = profileModal.querySelector(".close");
  const addButton = document.querySelector(".profile__addimg");
  const addCloseButton = addModal.querySelector(".close");
  const enlargeCloseButton = enlargeModal.querySelector(".fechar");

  const profileName = document.querySelector(".profile__name");
  const profileText = document.querySelector(".profile__text");
  const nameInput = profileModal.querySelector(".modal-content__name");
  const jobInput = profileModal.querySelector(".modal-content__text");

  const addForm = document.querySelector("#addForm");
  const titleInput = document.querySelector("#locationName");
  const urlInput = document.querySelector("#locationImage");
  const elementsContainer = document.querySelector(".elements");

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

  function handleCardClick(link, name) {
    const modalImage = document.querySelector("#Myplace");
    const modalTitle = document.querySelector("#captar");
    modalImage.src = link;
    modalImage.alt = name;
    modalTitle.textContent = name;
    openModal(enlargeModal);
  }

  profileEditButton.addEventListener("click", () => {
    // Define placeholders com os valores atuais do perfil
    nameInput.placeholder = profileName.textContent;
    jobInput.placeholder = profileText.textContent;

    // Limpa os valores para que apenas os placeholders sejam exibidos
    nameInput.value = "";
    jobInput.value = "";

    openModal(profileModal);
  });

  profileCloseButton.addEventListener("click", () => closeModal(profileModal));
  addButton.addEventListener("click", () => openModal(addModal));
  addCloseButton.addEventListener("click", () => closeModal(addModal));
  enlargeCloseButton.addEventListener("click", () => closeModal(enlargeModal));

  profileModal
    .querySelector(".modal-content__button")
    .addEventListener("click", (event) => {
      event.preventDefault();
      if (nameInput.value.trim() && jobInput.value.trim()) {
        profileName.textContent = nameInput.value;
        profileText.textContent = jobInput.value;
        closeModal(profileModal);
      }
    });

  addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (titleInput.value.trim() && urlInput.value.trim()) {
      const card = new Card(
        { name: titleInput.value, link: urlInput.value },
        "#card-template",
        handleCardClick
      );
      elementsContainer.prepend(card.generateCard());
      closeModal(addModal);
    }
  });

  initialCards.forEach((data) => {
    const card = new Card(data, "#card-template", handleCardClick);
    elementsContainer.appendChild(card.generateCard());
  });

  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    validator.enableValidation();
  });

  setCloseOnOverlay(profileModal);
  setCloseOnOverlay(addModal);
  setCloseOnOverlay(enlargeModal);
});
