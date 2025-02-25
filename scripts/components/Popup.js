export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    if (this._popup.id === "enlargeModal") {
      this._popup.classList.add("show-modal");
    } else {
      this._popup.classList.add("modal_opened");
    }
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    if (this._popup.id === "enlargeModal") {
      this._popup.classList.remove("show-modal");
    } else {
      this._popup.classList.remove("modal_opened");
    }
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("modal_opened") ||
        event.target.classList.contains("show-modal")
      ) {
        this.close();
      }
    });

    const closeButton = this._popup.querySelector(".close, .fechar");
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    }
  }
}
