export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element");

    if (!template) {
      throw new Error(`Template não encontrado: ${this._templateSelector}`);
    }

    return template.cloneNode(true); // Clona o conteúdo do template
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".element__like");
    const likedImage = this._element.querySelector(".element__likee");
    const deleteButton = this._element.querySelector(".element__delete");
    const cardImage = this._element.querySelector(".element__local");

    if (likeButton && likedImage) {
      likeButton.addEventListener("click", () => {
        likeButton.style.display = "none";
        likedImage.style.display = "block";
      });

      likedImage.addEventListener("click", () => {
        likedImage.style.display = "none";
        likeButton.style.display = "block";
      });
    }

    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        this._element.remove();
        this._element = null;
      });
    }

    if (cardImage) {
      cardImage.addEventListener("click", () => {
        this._handleCardClick(this._link, this._name);
      });
    }
  }

  generateCard() {
    this._element = this._getTemplate(); // Obtém o template do cartão
    this._element.querySelector(".element__title").textContent = this._name;

    const cardImage = this._element.querySelector(".element__local");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._setEventListeners(); // Adiciona os eventos necessários

    return this._element; // Retorna o elemento do cartão
  }
}
