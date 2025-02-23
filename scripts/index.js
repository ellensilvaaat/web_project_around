import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { Card } from "./components/Card.js";

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

// Criar a instância do popup de adicionar novo local
const addCardPopup = new PopupWithForm("#addModal", (data) => {
  const locationName = data.locationName ? data.locationName : "Local sem nome";
  const locationImage = data.locationImage ? data.locationImage : "";

  if (!locationImage) {
    alert("Por favor, insira uma URL de imagem válida.");
    return;
  }

  const cardElement = createCard({
    name: locationName,
    link: locationImage,
  });

  section.addItem(cardElement);
});
addCardPopup.setEventListeners();

// Adicionar eventos para abrir o modal de edição de perfil
document.querySelector("#Img").addEventListener("click", () => {
  const nameInput = document.querySelector(".modal-content__name");
  const jobInput = document.querySelector(".modal-content__text");

  // Resetar os inputs para forçar a exibição do placeholder
  nameInput.value = "";
  jobInput.value = "";

  profilePopup.open();
});

// Adicionar eventos para abrir o popup de adicionar card
document.querySelector(".profile__addimg").addEventListener("click", () => {
  addCardPopup.open();
});
