function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    const inputs = form.querySelectorAll(config.inputSelector);
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        validateInput(input, config);
        toggleButtonState(form, config);
      });
      input.addEventListener("blur", () => {
        validateInput(input, config); // Valida ao sair do campo
      });
    });
    toggleButtonState(form, config);
  });
}

function validateInput(input, config) {
  const errorElement = document.getElementById(`${input.id}-error`);

  if (!input.validity.valid) {
    const customMessage = getCustomErrorMessage(input);
    showInputError(input, errorElement, config, customMessage);
  } else {
    hideInputError(input, errorElement, config);
  }
}

function getCustomErrorMessage(input) {
  if (input.id === "locationImage") {
    if (input.validity.typeMismatch) {
      return "Por favor, insira um endereço web.";
    }
  }

  if (input.validity.valueMissing) {
    return "Preencha esse campo.";
  }

  if (input.validity.tooShort) {
    return `O campo deve ter no mínimo ${input.minLength} caracteres.`;
  }

  return input.validationMessage;
}

function showInputError(input, errorElement, config, message) {
  if (!errorElement) return;
  errorElement.textContent = message;
  errorElement.style.display = "block";
  input.classList.add(config.inputErrorClass);
}

function hideInputError(input, errorElement, config) {
  if (!errorElement) return;
  errorElement.textContent = "";
  errorElement.style.display = "none";
  input.classList.remove(config.inputErrorClass);
}

function toggleButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();

  if (isFormValid) {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  }
}

export { enableValidation };
