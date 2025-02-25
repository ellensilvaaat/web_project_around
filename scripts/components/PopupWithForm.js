import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
    this._inputList = this._form.querySelectorAll("input");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      if (this._form.id === "form") {
        inputValues[
          input.classList.contains("modal-content__name") ? "name" : "job"
        ] = input.value.trim();
      } else if (this._form.id === "addForm") {
        inputValues[input.id] = input.value.trim();
      }
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      if (this._form.id === "form") {
        if (input.classList.contains("modal-content__name")) {
          input.value = data.name ? data.name : "";
        } else if (input.classList.contains("modal-content__text")) {
          input.value = data.job ? data.job : "";
        }
      } else if (this._form.id === "addForm") {
        if (data[input.id]) {
          input.value = data[input.id];
        }
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
