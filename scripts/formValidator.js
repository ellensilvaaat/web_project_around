import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";

// Configuração do validador
const config = {
  inputSelector: ".modal-content__text",
  submitButtonSelector: ".modal-content__button",
  inputErrorClass: "input-error",
  errorClass: "popup__error_visible",
  inactiveButtonClass: "button_inactive",
};

// Criar uma instância do validador para o segundo popup (Adicionar novo local)
const addFormValidator = new FormValidator(
  config,
  document.querySelector("#addForm")
);
addFormValidator.enableValidation();

// Criar uma instância do popup de imagem
const popupWithImage = new PopupWithImage("#enlargeModal");
popupWithImage.setEventListeners();

// Lista de cards iniciais
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

// Seleciona o container onde os cards serão adicionados
const elementsContainer = ".elements";

// Função para criar um card
const createCard = (data) => {
  return new Card(data, "#card-template", (link, name) =>
    popupWithImage.open(link, name)
  ).generateCard();
};

// Criar a seção e renderizar os cards iniciais
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

// Criar a instância do usuário
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__text",
});

// Criar a instância do popup de edição de perfil
const profilePopup = new PopupWithForm("#Modal", (data) => {
  userInfo.setUserInfo({
    name: data.name,
    job: data.job,
  });
});
profilePopup.setEventListeners();

// Criar a instância do popup de adicionar novo local (CORREÇÃO DA MENSAGEM DE ERRO)
const addCardPopup = new PopupWithForm("#addModal", (data) => {
  const locationName = data.locationName ? data.locationName : "Local sem nome";
  const locationImage = data.locationImage ? data.locationImage : "";

  const errorMessage = document.getElementById("locationImage-error");

  // Resetar mensagem de erro antes de validar
  errorMessage.textContent = "";
  errorMessage.style.display = "none";

  if (!locationImage) {
    errorMessage.textContent = "Por favor, insira uma URL de imagem válida.";
    errorMessage.classList.add("popup__error_visible");
    errorMessage.style.display = "block"; // 🔹 Garante que a mensagem apareça
    return;
  }

  // Validar se a URL realmente é uma imagem
  const isValidImageURL = /\.(jpeg|jpg|gif|png|webp)$/i.test(locationImage);
  if (!isValidImageURL) {
    errorMessage.textContent =
      "A URL precisa ser uma imagem válida (JPG, PNG, GIF, WEBP).";
    errorMessage.classList.add("popup__error_visible");
    errorMessage.style.display = "block"; // 🔹 Garante que a mensagem apareça
    return;
  }

  // Se a URL for válida, limpar a mensagem de erro
  errorMessage.textContent = "";
  errorMessage.classList.remove("popup__error_visible");
  errorMessage.style.display = "none"; // 🔹 Esconde a mensagem caso a URL esteja correta

  const cardElement = createCard({
    name: locationName,
    link: locationImage,
  });

  section.addItem(cardElement);
  document.getElementById("addForm").reset(); // 🔹 Reseta o formulário após adicionar um novo card
});
addCardPopup.setEventListeners();

// Adicionar eventos para abrir o modal de edição de perfil
document.querySelector("#Img").addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profilePopup.setInputValues({
    name: currentUserInfo.name,
    job: currentUserInfo.job,
  });
  profilePopup.open();
});

// Adicionar eventos para abrir o popup de adicionar card (Zera o erro ao abrir)
document.querySelector(".profile__addimg").addEventListener("click", () => {
  const errorMessage = document.getElementById("locationImage-error");

  if (errorMessage) {
    errorMessage.textContent = "";
    errorMessage.style.display = "none"; // 🔹 Reseta o erro ao abrir o popup
  }

  addCardPopup.open();
});
