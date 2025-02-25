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
    const isLiked =
      this._likeButton.getAttribute("src") === "./images/Group.png";

    if (isLiked) {
      this._likeButton.setAttribute("src", "./images/Union.png");
      this._likeButton.setAttribute("alt", "Curtido");
    } else {
      this._likeButton.setAttribute("src", "./images/Group.png");
      this._likeButton.setAttribute("alt", "Curtir");
    }
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".element__local");
    this._titleElement = this._element.querySelector(".element__title");
    this._likeButton = this._element.querySelector(".element__like");
    this._deleteButton = this._element.querySelector(".element__delete");

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._likeButton.setAttribute("src", "./images/Group.png");
    this._likeButton.setAttribute("alt", "Curtir");

    this._setEventListeners();
    return this._element;
  }
}
