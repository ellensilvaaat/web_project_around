export function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeOnEsc);
}

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeOnEsc);
}

function closeOnEsc(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) closeModal(openModal);
  }
}

export function setCloseOnOverlay(modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal);
  });
}
