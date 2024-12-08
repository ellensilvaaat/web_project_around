var form = document.querySelector("#Modal form");
var profileImage = document.getElementById("Img");
var profileModal = document.getElementById("Modal");
var profileClose = profileModal.querySelector(".close");

// Abrir o modal quando clicar na imagem
profileImage.addEventListener("click", function () {
  profileModal.style.display = "block";
  profileModal.classList.add("show-modal");
});

// Fechar o modal quando clicar no "x"
profileClose.addEventListener("click", function () {
  profileModal.style.display = "none";
  profileModal.classList.remove("show-modal");
});

// Fechar o modal ao clicar fora do conteúdo
window.addEventListener("click", function (event) {
  if (event.target === profileModal) {
    profileModal.style.display = "none";
    profileModal.classList.remove("show-modal");
  }
});

// Enviar o formulário e atualizar o perfil
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

// Like
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os elementos com a classe element__like--inactive
  const inactiveLikes = document.querySelectorAll(".element__like--inactive");
  const activeLikes = document.querySelectorAll(".element__like--active");

  // Itera sobre os pares de botões de curtida
  inactiveLikes.forEach((inactiveLike, index) => {
    const activeLike = activeLikes[index]; // Botão correspondente (ativo)

    // Esconde o botão ativo no início
    activeLike.style.display = "none";

    // Adiciona evento ao botão de coração vazio
    inactiveLike.addEventListener("click", () => {
      inactiveLike.style.display = "none"; // Esconde o botão vazio
      activeLike.style.display = "inline"; // Mostra o botão preenchido
    });

    // Adiciona evento ao botão de coração preenchido
    activeLike.addEventListener("click", () => {
      activeLike.style.display = "none"; // Esconde o botão preenchido
      inactiveLike.style.display = "inline"; // Mostra o botão vazio
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Seleciona o botão de adicionar e o modal correspondente
  const addButton = document.querySelector(".profile__addimg");
  const addModal = document.getElementById("addModal");
  const addClose = document.getElementById("addClose");
  const addForm = document.getElementById("addForm");
  const elementsContainer = document.querySelector(".elements");

  // Função para abrir o modal de adicionar
  addButton.addEventListener("click", () => {
    addModal.style.display = "block";
  });

  // Função para fechar o modal de adicionar
  addClose.addEventListener("click", () => {
    addModal.style.display = "none";
  });

  // Fechar o modal clicando fora do conteúdo
  window.addEventListener("click", (event) => {
    if (event.target === addModal) {
      addModal.style.display = "none";
    }
  });

  // Evento de envio do formulário
  addForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtém os valores inseridos pelo usuário
    const locationName = document.getElementById("locationName").value;
    const locationImage = document.getElementById("locationImage").value;

    // Cria um novo card na seção de elementos
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

    // Adiciona o novo card ao container de elementos
    elementsContainer.prepend(newCard);

    // Reseta o formulário
    addForm.reset();

    // Fecha o modal
    addModal.style.display = "none";

    // Reaplica a lógica de curtida para o novo card
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
