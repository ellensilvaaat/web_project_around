import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { Card } from "./components/Card.js";
import { FormValidator } from "./FormValidator.js";

const config = {
  inputSelector: ".modal-content__text",
  submitButtonSelector: ".modal-content__button",
  inputErrorClass: "input-error",
  errorClass: "popup__error_visible",
  inactiveButtonClass: "button_inactive",
};

const addFormValidator = new FormValidator(
  config,
  document.querySelector("#addForm")
);
addFormValidator.enableValidation();

const popupWithImage = new PopupWithImage("#enlargeModal");
popupWithImage.setEventListeners();

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

const elementsContainer = ".elements";

const createCard = (data) => {
  return new Card(data, "#card-template", (link, name) =>
    popupWithImage.open(link, name)
  ).generateCard();
};

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      section.addItem(cardElement);
    },
  },
  elementsContainer
);
section.renderItems();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__text",
});

const profilePopup = new PopupWithForm("#Modal", (data) => {
  userInfo.setUserInfo({
    name: data.name,
    job: data.job,
  });
});
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#addModal", (data) => {
  const locationName = data.locationName || "Local sem nome";
  const locationImage = data.locationImage || "";

  const errorMessage = document.getElementById("locationImage-error");

  errorMessage.textContent = "";
  errorMessage.style.display = "none";

  if (!locationImage) {
    errorMessage.textContent = "Por favor, insira uma URL de imagem válida.";
    errorMessage.classList.add("popup__error_visible");
    errorMessage.style.display = "block";
    return;
  }

  const isValidImageURL = /\.(jpeg|jpg|gif|png|webp)$/i.test(locationImage);
  if (!isValidImageURL) {
    errorMessage.textContent =
      "A URL precisa ser uma imagem válida (JPG, PNG, GIF, WEBP).";
    errorMessage.classList.add("popup__error_visible");
    errorMessage.style.display = "block";
    return;
  }

  const cardElement = createCard({ name: locationName, link: locationImage });
  section.addItem(cardElement);
  document.getElementById("addForm").reset();
});
addCardPopup.setEventListeners();

document.querySelector("#Img").addEventListener("click", () => {
  const nameInput = document.querySelector(".modal-content__name");
  const jobInput = document.querySelector(".modal-content__text");

  nameInput.value = "";
  jobInput.value = "";

  profilePopup.open();
});

document.querySelector(".profile__addimg").addEventListener("click", () => {
  const errorMessage = document.getElementById("locationImage-error");
  if (errorMessage) {
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
  }
  addCardPopup.open();
});
