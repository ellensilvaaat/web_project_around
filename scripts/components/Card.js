export class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._toggleLike());
    this._deleteButton.addEventListener("click", () => this._deleteCard());
    this._imageElement.addEventListener("click", () =>
      this._handleImageClick(this._link, this._name)
    );
  }

  _toggleLike() {
    // Alterna entre os dois ícones (curtido/não curtido)
    if (this._likedButton.style.display === "none") {
      this._likeButton.style.display = "none"; // Esconde o botão de "não curtido"
      this._likedButton.style.display = "inline-block"; // Mostra o botão de "curtido"
    } else {
      this._likeButton.style.display = "inline-block"; // Mostra o botão de "não curtido"
      this._likedButton.style.display = "none"; // Esconde o botão de "curtido"
    }
  }

  _deleteCard() {
    this._element.remove();
    this._element = null; // Remover referência para evitar vazamento de memória
  }

  generateCard() {
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector(".element__local");
    this._titleElement = this._element.querySelector(".element__title");
    this._likeButton = this._element.querySelector(".element__like"); // Ícone inicial (não curtido)
    this._likedButton = this._element.querySelector(".element__likee"); // Ícone de "curtido"
    this._deleteButton = this._element.querySelector(".element__delete");

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    // Garantir que o estado inicial seja "não curtido"
    this._likeButton.style.display = "inline-block"; // Mostra o botão "não curtido"
    this._likedButton.style.display = "none"; // Esconde o botão "curtido"

    this._setEventListeners();

    return this._element;
  }
}
