export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  // Exibe a mensagem de erro
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    // Verifica se o elemento de erro existe
    if (!errorElement) {
      console.error(
        `Elemento de erro não encontrado para o campo: ${inputElement.id}`
      );
      return;
    }

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass); // Adiciona a classe de exibição
    console.log(`Erro exibido para o campo: ${inputElement.id}`);
  }

  // Oculta a mensagem de erro
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    // Verifica se o elemento de erro existe
    if (!errorElement) {
      console.error(
        `Elemento de erro não encontrado para o campo: ${inputElement.id}`
      );
      return;
    }

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass); // Remove a classe de exibição
    console.log(`Erro removido para o campo: ${inputElement.id}`);
  }

  // Verifica a validade do campo
  _checkInputValidity(inputElement) {
    let errorMessage = "";

    if (inputElement.validity.valueMissing) {
      errorMessage = "Preencha esse campo.";
    } else if (
      inputElement.validity.typeMismatch &&
      inputElement.type === "url"
    ) {
      errorMessage = "Por favor, insira um endereço web.";
    } else if (inputElement.validity.tooShort) {
      errorMessage = `O campo deve ter no mínimo ${inputElement.minLength} caracteres.`;
    } else if (inputElement.validity.tooLong) {
      errorMessage = `O campo deve ter no máximo ${inputElement.maxLength} caracteres.`;
    }

    if (errorMessage) {
      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Alterna o estado do botão de envio
  _toggleButtonState() {
    const isFormValid = this._inputList.every((input) => input.validity.valid);

    if (isFormValid) {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    }
  }

  // Configura os ouvintes de eventos
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        console.log(
          `Evento disparado para o campo: ${inputElement.id || "sem ID"}`
        );
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Habilita a validação no formulário
  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }
}
